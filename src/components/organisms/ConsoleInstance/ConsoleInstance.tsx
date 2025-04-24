import React from 'react';
import { DefaultTheme, useTheme } from 'styled-components';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

import { Button } from 'components/atoms/Button';
import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { Notification } from 'components/atoms/Notification';
import { Editor } from 'components/molecules/Editor';
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

	const promptRef = React.useRef(null);
	const loadingRef = React.useRef(false);
	const consoleRef = React.useRef(null);
	const terminalRef = React.useRef(null);
	const termInstance = React.useRef(null);
	const fitAddon = React.useRef<FitAddon | null>(null);

	const [inputProcessId, setInputProcessId] = React.useState<string>(props.processId);
	const [loadingTx, setLoadingTx] = React.useState<boolean>(false);
	const [txResponse, setTxResponse] = React.useState<GQLNodeResponseType | null>(null);
	const [loadingOptions, setLoadingOptions] = React.useState<boolean>(false);
	const [txOptions, setTxOptions] = React.useState<GQLNodeResponseType[] | null>(null);

	const [prompt, setPrompt] = React.useState<string>('> ');
	const [fullScreenMode, setFullScreenMode] = React.useState<boolean>(false);
	const [editorMode, setEditorMode] = React.useState<boolean>(false);
	const [editorData, setEditorData] = React.useState<string>('');
	const [error, setError] = React.useState<string | null>(null);

	const [loadingMessage, setLoadingMessage] = React.useState<boolean>(false);

	const toggleFullscreen = React.useCallback(async () => {
		const el = consoleRef.current!;
		if (!document.fullscreenElement) {
			await el.requestFullscreen?.();
		} else {
			await document.exitFullscreen?.();
		}
	}, []);

	React.useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey && (e.key === 'e' || e.key === 'E')) {
				e.preventDefault();
				setEditorMode((prev) => !prev);
			}
		};

		window.addEventListener('keydown', onKeyDown, true);
		return () => {
			window.removeEventListener('keydown', onKeyDown, true);
		};
	}, []);

	React.useEffect(() => {
		if (editorMode && termInstance.current) {
			termInstance.current.write(`\r\n\r\n\x1b[90mEditor Open: Hit the checkmark or (Ctrl + L) to evaluate\x1b[0m`);
			termInstance.current.write('\x1b[?25l');
			loadingRef.current = true;
		} else {
			loadingRef.current = false;
		}
	}, [editorMode]);

	React.useEffect(() => {
		loadingRef.current = editorMode;
	}, [editorMode]);

	React.useEffect(() => {
		promptRef.current = prompt;
	}, [prompt]);

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
		const onKeyDown = (e: KeyboardEvent) => {
			if (!editorMode || !editorData) return;

			if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) {
				e.preventDefault();
				handleEditorSend();
			}
		};

		window.addEventListener('keydown', onKeyDown);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [editorMode, editorData]);

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

				const handleResize = () => {
					fitAddon.current?.fit();
				};

				window.addEventListener('resize', handleResize);

				termInstance.current.write(`\x1b[32mWelcome to AOS\x1b[0m\r\n\r\n`);
				termInstance.current.write(`\x1b[90mOpen the editor with: (Ctrl + E) or '.editor'\x1b[0m\r\n\r\n`);
				termInstance.current.write(`\x1b[90mProcess ID:\x1b[0m \x1b[32m${inputProcessId}\x1b[0m\r\n`);

				await sendMessage(null, 'prompt');

				let commandBuffer = '';
				let cursorPosition = 0;
				const commandHistory: string[] = [];
				let historyIndex: number = commandHistory.length;

				const refreshLine = () => {
					const currentPrompt = promptRef.current;
					termInstance.current.write(`\x1b[2K\r${currentPrompt}${commandBuffer}`);
					const moveLeftCount = currentPrompt.length + commandBuffer.length - (currentPrompt.length + cursorPosition);
					if (moveLeftCount > 0) {
						termInstance.current.write(`\x1b[${moveLeftCount}D`);
					}
				};

				termInstance.current.onData(async (data: string) => {
					if (loadingRef.current) return;

					/* Arrow / Control Sequences */
					if (data.startsWith('\x1b')) {
						switch (data) {
							case '\x1b[A' /* Up */:
								historyIndex = Math.max(0, historyIndex - 1);
								commandBuffer = commandHistory[historyIndex] || '';
								cursorPosition = commandBuffer.length;
								refreshLine();
								return;
							case '\x1b[B' /* Down */:
								historyIndex = Math.min(commandHistory.length, historyIndex + 1);
								commandBuffer = commandHistory[historyIndex] || '';
								cursorPosition = commandBuffer.length;
								refreshLine();
								return;
							case '\x1b[D' /* Left */:
								if (cursorPosition > 0) {
									cursorPosition--;
									refreshLine();
								}
								return;
							case '\x1b[C' /* Right */:
								if (cursorPosition < commandBuffer.length) {
									cursorPosition++;
									refreshLine();
								}
								return;
							default:
								return;
						}
					}

					/* Enter */
					if (data === '\r') {
						if (commandBuffer.trim()) {
							commandHistory.push(commandBuffer.trim());
							historyIndex = commandHistory.length;
							
							await resolveCommand(commandBuffer);
						}
						commandBuffer = '';
						cursorPosition = 0;
						return;
					}

					/* Backspace */
					if (data === '\u007F') {
						if (cursorPosition > 0) {
							commandBuffer = commandBuffer.slice(0, cursorPosition - 1) + commandBuffer.slice(cursorPosition);
							cursorPosition--;
							refreshLine();
						}
						return;
					}

					/* Insert at cursor position, bump cursor, and redraw */
					commandBuffer = commandBuffer.slice(0, cursorPosition) + data + commandBuffer.slice(cursorPosition);
					cursorPosition++;
					refreshLine();
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

	function handleEditorSend() {
		if (editorData) sendMessage(editorData);
	}

	async function resolveCommand(data: string | null) {
		if (data.startsWith('.')) {
			const command = data.substring(1);
			
			switch(command) {
				case 'editor':
					setEditorMode((prev) => !prev);
					return;
				default:
					termInstance.current.write(`\r\n\x1b[91mCommand Not Supported\x1b[0m\r\n`);
					termInstance.current.write('\r');
					termInstance.current.write(promptRef.current);
					return;
			}
		}

		await sendMessage(data);
	}

	async function sendMessage(data: string | null, outputType?: 'data' | 'prompt') {
		if (termInstance.current) {
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

				stopLoader();

				if (!outputType || outputType === 'data') {
					let rawOutput = '';
					let isError = false;

					if (response?.Output?.data) {
						if (typeof response?.Output?.data === 'object') {
							if (response?.Output?.data?.output) {
								rawOutput = response.Output.data.output;
							}
						} else {
							rawOutput = response.Output.data;
						}
					} else {
						if (response?.Error) {
							rawOutput = response.Error;
							isError = true;
						}
					}

					const sanitizedOutput = rawOutput.toString().replace(/\t/g, '  ');
					termInstance.current.write('\r\x1b[2K');

					sanitizedOutput.split('\n').forEach((line: string) => {
						if (isError) {
							termInstance.current.write(`\x1b[91m${line}\x1b[0m\r\n`);
						} else {
							termInstance.current.write(line + '\r\n');
						}
					});
				}

				const newPrompt = response?.Output?.prompt ?? promptRef.current;

				setPrompt(newPrompt);
				setEditorData('');
				termInstance.current.write('\r');
				termInstance.current.write(newPrompt);
			} catch (e: any) {
				stopLoader();
				termInstance.current.write(prompt);
			}
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
			brightRed: currentTheme.colors.warning.primary,
			brightGreen: currentTheme.colors.editor.alt3,
			brightYellow: currentTheme.colors.editor.alt6,
			brightBlue: currentTheme.colors.editor.alt4,
			brightMagenta: currentTheme.colors.editor.alt8,
			brightCyan: currentTheme.colors.editor.alt7,
			brightWhite: '#EEEEEE',
			selectionBackground: '#4A78DA',
			selectionForeground: '#FAFAFA',
		};
	}

	const spinnerFrames = ['Loading      ', 'Loading.     ', 'Loading..    ', 'Loading...   '];

	let spinnerInterval: ReturnType<typeof setInterval> | null = null;
	let currentFrame = 0;

	function stopSpinner() {
		if (spinnerInterval) {
			clearInterval(spinnerInterval);
			spinnerInterval = null;
		}
		termInstance.current.write('\r\x1b[2K');
		termInstance.current.write('\x1b[?25h');
	}

	function startLoader() {
		setLoadingMessage(true);
		loadingRef.current = true;
		termInstance.current.write('\n');
		termInstance.current.write('\x1b[?25l');
		spinnerInterval = setInterval(() => {
			termInstance.current.write('\r\x1b[2K');
			termInstance.current.write(`\x1b[32m${spinnerFrames[currentFrame]}\x1b[0m\r`);
			currentFrame = (currentFrame + 1) % spinnerFrames.length;
		}, 135);
	}

	function stopLoader() {
		stopSpinner();
		loadingRef.current = false;
		setLoadingMessage(false);
		termInstance.current.write('\r\x1b[2K');
		termInstance.current.write('\x1b[?25h');
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
				editorMode={editorMode}
				ref={terminalRef}
			/>
		);
	}

	return props.active ? (
		<>
			<S.Wrapper noWrapper={props.noWrapper} ref={consoleRef}>
				{editorMode && (
					<S.Editor className={'fade-in'}>
						<Editor
							initialData={''}
							setEditorData={(data: string) => setEditorData(data)}
							language={'lua'}
							loading={loadingMessage}
							noFullScreen
						/>
						{editorMode && (
							<S.LoadWrapper noWrapper={props.noWrapper} fullScreenMode={fullScreenMode}>
								<IconButton
									type={'alt1'}
									src={ASSETS.checkmark}
									handlePress={() => handleEditorSend()}
									dimensions={{
										wrapper: 25,
										icon: 12.5,
									}}
									disabled={!editorData}
									tooltip={`${language.load} (Ctrl + L)`}
									tooltipPosition={'top-right'}
								/>
							</S.LoadWrapper>
						)}
					</S.Editor>
				)}
				{getConsole()}
				<S.ActionsWrapper noWrapper={props.noWrapper} fullScreenMode={fullScreenMode}>
					<IconButton
						type={'alt1'}
						src={ASSETS.code}
						handlePress={() => setEditorMode((prev) => !prev)}
						dimensions={{
							wrapper: 25,
							icon: 12.5,
						}}
						tooltip={editorMode ? language.closeEditor : language.openEditor}
						tooltipPosition={'top-right'}
					/>
					<IconButton
						type={'alt1'}
						src={ASSETS.fullscreen}
						handlePress={toggleFullscreen}
						dimensions={{
							wrapper: 25,
							icon: 12.5,
						}}
						tooltip={fullScreenMode ? language.exitFullScreen : language.enterFullScreen}
						tooltipPosition={'top-right'}
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
