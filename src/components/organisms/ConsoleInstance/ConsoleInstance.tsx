import React from 'react';
import { DefaultTheme, useTheme } from 'styled-components';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

import { Button } from 'components/atoms/Button';
import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { Notification } from 'components/atoms/Notification';
import { ASSETS } from 'helpers/config';
import { GQLNodeResponseType } from 'helpers/types';
import { checkValidAddress, formatAddress, getTagValue } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { usePermawebProvider } from 'providers/PermawebProvider';
import { WalletBlock } from 'wallet/WalletBlock';

import 'xterm/css/xterm.css';

import * as S from './styles';

export default function ConsoleInstance(props: {
	processId: string;
	active: boolean;
	onTxChange?: (newTx: GQLNodeResponseType) => void;
	noWrapper?: boolean;
}) {
	const theme = useTheme();

	const arProvider = useArweaveProvider();
	const permawebProvider = usePermawebProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const consoleRef = React.useRef(null);
	const terminalRef = React.useRef(null);
	const termInstance = React.useRef(null);
	const fitAddon = React.useRef<FitAddon | null>(null);

	const [inputProcessId, setInputProcessId] = React.useState<string>(props.processId);
	const [loadingTx, setLoadingTx] = React.useState<boolean>(false);
	const [txResponse, setTxResponse] = React.useState<GQLNodeResponseType | null>(null);
	const [loadingOptions, setLoadingOptions] = React.useState<boolean>(false);
	const [txOptions, setTxOptions] = React.useState<GQLNodeResponseType[] | null>(null);

	const [fullScreenMode, setFullScreenMode] = React.useState<boolean>(false);
	const [hasFetched, setHasFetched] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	const [loadingMessage, setLoadingMessage] = React.useState<boolean>(false);

	const toggleFullscreen = React.useCallback(async () => {
		const el = terminalRef.current!;
		if (!document.fullscreenElement) {
			await el.requestFullscreen?.();
		} else {
			await document.exitFullscreen?.();
		}
	}, []);

	React.useEffect(() => {
		const onFullScreenChange = () => {
			setFullScreenMode(!!document.fullscreenElement);
		};
		document.addEventListener('fullscreenchange', onFullScreenChange);
		return () => {
			document.removeEventListener('fullscreenchange', onFullScreenChange);
		};
	}, []);

	React.useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && fullScreenMode) {
				toggleFullscreen();
			}
		};
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [fullScreenMode, toggleFullscreen]);

	React.useEffect(() => {
		if (consoleRef.current && props.active) {
			setTimeout(() => {
				consoleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 10);
		}
	}, [props.active]);

	React.useEffect(() => {
		(async function () {
			if (props.active) {
				if (inputProcessId && checkValidAddress(inputProcessId)) {
					setLoadingTx(true);
					try {
						const response = await permawebProvider.libs.getGQLData({ ids: [inputProcessId] });
						const responseData = response?.data?.[0];

						setTxResponse(responseData ?? null);

						if (responseData) {
							if (props.onTxChange) props.onTxChange(responseData);
						} else {
							setError(language.txNotFound);
						}
					} catch (e: any) {
						setError(e.message ?? language.errorFetchingTx);
					}
					setLoadingTx(false);
				} else {
					if (arProvider.walletAddress) {
						setLoadingOptions(true);
						try {
							const response = await permawebProvider.libs.getAggregatedGQLData({
								owners: [arProvider.walletAddress],
								tags: [{ name: 'Type', values: ['Process'] }],
							});

							setTxOptions(response);
						} catch (e: any) {
							setError(e.message ?? language.errorOccurred);
						}
						setLoadingOptions(false);
					}
				}
			}
		})();
	}, [inputProcessId, arProvider.walletAddress, props.active]);

	React.useEffect(() => {
		(async function () {
			if (props.active && terminalRef.current && arProvider.wallet && checkValidAddress(inputProcessId)) {
				fitAddon.current = new FitAddon();
				await document.fonts.ready;

				termInstance.current = new Terminal({
					cursorBlink: false,
					fontFamily: theme.typography.family.alt2,
					fontSize: 13,
					fontWeight: 600,
					theme: getTheme(theme),
				});

				termInstance.current.loadAddon(fitAddon.current);

				termInstance.current.open(terminalRef.current);

				fitAddon.current.fit();

				// setTimeout(() => {
				// 	fitAddon.current?.fit();
				// }, 500);

				const handleResize = () => {
					fitAddon.current?.fit();
				};
				window.addEventListener('resize', handleResize);

				termInstance.current.write(`\x1b[32mWelcome to AOS\x1b[0m\r\n\r\n`);
				termInstance.current.write(`\x1b[90mProcess ID:\x1b[0m \x1b[32m${inputProcessId}\x1b[0m\r\n`);

				await sendMessage(null, 'prompt');

				// Command state variables
				let commandBuffer = '';
				let cursorPosition = 0;
				// const commandHistory: string[] = [];
				// let historyIndex = commandHistory.length;

				// Helper to refresh the command line
				const refreshLine = () => {
					// Clear the current line and reset the cursor to the beginning.
					// \x1b[2K clears the entire line, \r returns the cursor to the beginning.
					termInstance.current.write('\x1b[2K\r' + commandBuffer);
					// If the cursor is not at the end, move the terminal cursor left accordingly.
					const moveLeftCount = commandBuffer.length - cursorPosition;
					if (moveLeftCount > 0) {
						termInstance.current.write(`\x1b[${moveLeftCount}D`);
					}
				};

				const commandHistory: string[] = [];
				let historyIndex: number = commandHistory.length;

				termInstance.current.onData(async (data: string) => {
					if (data.startsWith('\x1b')) {
						if (data === '\x1b[A') {
							// Up arrow: navigate to previous command in history
							historyIndex = Math.max(0, historyIndex - 1);
							const previousCommand = commandHistory[historyIndex] || '';
							commandBuffer = previousCommand;
							cursorPosition = commandBuffer.length;
							// refreshLine();
							return;
						} else if (data === '\x1b[B') {
							// Down arrow: navigate to next command in history
							historyIndex = Math.min(commandHistory.length, historyIndex + 1);
							const nextCommand = commandHistory[historyIndex] || '';
							commandBuffer = nextCommand;
							cursorPosition = commandBuffer.length;
							// refreshLine();
							return;
						} else if (data === '\x1b[D') {
							// Left arrow: move the cursor left if possible
							if (cursorPosition > 0) {
								cursorPosition--;
								termInstance.current.write('\x1b[D');
							}
							return;
						} else if (data === '\x1b[C') {
							// Right arrow: move the cursor right if possible
							if (cursorPosition < commandBuffer.length) {
								cursorPosition++;
								termInstance.current.write('\x1b[C');
							}
							return;
						}
						return;
					}

					if (data === '\r') {
						console.log(commandBuffer);
						if (commandBuffer.trim() !== '') {
							commandHistory.push(commandBuffer.trim());
							historyIndex = commandHistory.length; // Reset history index
						}
						await sendMessage(commandBuffer);
						commandBuffer = '';
					} else if (data === '\u007F') {
						if (commandBuffer.length > 0) {
							commandBuffer = commandBuffer.slice(0, -1);
							termInstance.current.write('\b \b');
						}
					} else {
						commandBuffer += data;
						termInstance.current.write(data);
					}
				});
			}
		})();

		return () => {
			if (termInstance.current) {
				termInstance.current.dispose();
			}
		};
	}, [props.active, inputProcessId, permawebProvider.libs]);

	React.useEffect(() => {
		if (termInstance.current) {
			termInstance.current.options.theme = getTheme(theme);
			termInstance.current.refresh(0, termInstance.current.rows - 1);
		}
	}, [theme]);

	const spinnerFrames = ['Loading      ', 'Loading.     ', 'Loading..    ', 'Loading...   '];

	let spinnerInterval: ReturnType<typeof setInterval> | null = null;
	let currentFrame = 0;

	function startLoader() {
		setLoadingMessage(true);
		termInstance.current.write('\n');
		termInstance.current.write('\x1b[?25l');
		spinnerInterval = setInterval(() => {
			termInstance.current.write('\r\x1b[2K');
			termInstance.current.write(`\x1b[32m${spinnerFrames[currentFrame]}\x1b[0m\r`);
			currentFrame = (currentFrame + 1) % spinnerFrames.length;
		}, 135);
	}

	function stopSpinner() {
		if (spinnerInterval) {
			clearInterval(spinnerInterval);
			spinnerInterval = null;
		}
		termInstance.current.write('\r\x1b[2K');
		termInstance.current.write('\x1b[?25h');
	}

	function clearLoader() {
		stopSpinner();
		setLoadingMessage(false);
		termInstance.current.write('\r\x1b[2K');
		termInstance.current.write('\x1b[?25h');
	}

	// TODO: Disable input while loading
	async function sendMessage(data: string | null, outputType?: 'data' | 'prompt') {
		startLoader();

		try {
			const message = await permawebProvider.libs.sendMessage({
				processId: inputProcessId,
				action: 'Eval',
				data: data ?? '',
				useRawData: true,
			});

			const response = await permawebProvider.ao.result({
				process: inputProcessId,
				message: message,
			});

			console.log(response);

			clearLoader();

			if (!outputType || outputType === 'data') {
				let rawOutput = '';
				if (response?.Output?.data) {
					if (typeof response?.Output?.data === 'object') {
						if (response?.Output?.data?.output) {
							rawOutput = response.Output.data.output;
						}
					} else {
						rawOutput = response.Output.data;
					}
				}

				const sanitizedOutput = rawOutput.toString().replace(/\t/g, '  ');
				termInstance.current.write('\r\x1b[2K');
				sanitizedOutput.split('\n').forEach((line: string) => {
					termInstance.current.write(line + '\r\n');
				});
			}

			termInstance.current.write('\r');
			termInstance.current.write(response?.Output?.prompt ?? '> ');
		} catch (e: any) {
			clearLoader();
			termInstance.current.write('> ');
		}
	}

	function getTheme(currentTheme: DefaultTheme) {
		return {
			background: props.noWrapper ? currentTheme.colors.view.background : currentTheme.colors.container.alt1.background,
			foreground: currentTheme.colors.font.primary,
			cursor: currentTheme.colors.font.alt1,
			black: currentTheme.colors.editor.alt10,
			red: currentTheme.colors.editor.primary,
			green: currentTheme.colors.editor.alt3,
			yellow: currentTheme.colors.editor.alt6,
			blue: currentTheme.colors.editor.alt4,
			magenta: currentTheme.colors.editor.alt8,
			cyan: currentTheme.colors.editor.alt7,
			white: '#EEEEEE',
			brightBlack: currentTheme.colors.editor.alt10,
			brightRed: currentTheme.colors.editor.primary,
			brightGreen: currentTheme.colors.editor.alt3,
			brightYellow: currentTheme.colors.editor.alt6,
			brightBlue: currentTheme.colors.editor.alt4,
			brightMagenta: currentTheme.colors.editor.alt8,
			brightCyan: currentTheme.colors.editor.alt7,
			brightWhite: '#EEEEEE',
		};
	}

	function getConsole() {
		if (!arProvider.walletAddress) {
			return <WalletBlock />;
		}

		if (!inputProcessId) {
			return (
				<S.OptionsWrapper>
					<S.OptionsHeader>
						<p>Select a process to connect with AOS</p>
					</S.OptionsHeader>
					{loadingOptions ? (
						<S.OptionsLoader>
							<Loader sm relative />
						</S.OptionsLoader>
					) : (
						<>
							{txOptions && (
								<S.Options className={'scroll-wrapper-hidden'}>
									{txOptions.map((tx: GQLNodeResponseType, index: number) => {
										const name = getTagValue(tx.node.tags, 'Name');
										return (
											<Button
												key={index}
												type={'primary'}
												label={name ?? formatAddress(tx.node.id, false)}
												handlePress={() => setInputProcessId(tx.node.id)}
												height={42.5}
												fullWidth
											/>
										);
									})}
								</S.Options>
							)}
						</>
					)}
				</S.OptionsWrapper>
			);
		}

		return (
			<S.Console
				className={`${props.noWrapper && !fullScreenMode ? '' : 'border-wrapper-alt3 '}scroll-wrapper`}
				noWrapper={props.noWrapper && !fullScreenMode}
				ref={terminalRef}
			/>
		);
	}

	return props.active ? (
		<>
			<S.Wrapper noWrapper={props.noWrapper} ref={consoleRef}>
				{getConsole()}
				{/* {loadingMessage && (
					<S.LoadingWrapper>
						<Loader sm relative />
					</S.LoadingWrapper>
				)} */}
				<S.ActionsWrapper>
					<IconButton
						type={'alt1'}
						src={ASSETS.fullscreen}
						handlePress={toggleFullscreen}
						dimensions={{
							wrapper: 25,
							icon: 12.5,
						}}
					/>
				</S.ActionsWrapper>
			</S.Wrapper>
			{error && (
				<Notification
					type={'warning'}
					message={error}
					callback={() => {
						setError(null);
						setInputProcessId('');
					}}
				/>
			)}
		</>
	) : null;
}
