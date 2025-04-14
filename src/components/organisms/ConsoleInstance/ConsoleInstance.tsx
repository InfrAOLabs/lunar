import React from 'react';
import { DefaultTheme, useTheme } from 'styled-components';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

import { ViewWrapper } from 'app/styles';
import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import { Notification } from 'components/atoms/Notification';
import { ViewHeader } from 'components/atoms/ViewHeader';
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

	const terminalRef = React.useRef(null);
	const termInstance = React.useRef(null);
	const fitAddon = React.useRef<FitAddon | null>(null);

	const [inputProcessId, setInputProcessId] = React.useState<string>(props.processId);
	const [loadingTx, setLoadingTx] = React.useState<boolean>(false);
	const [txResponse, setTxResponse] = React.useState<GQLNodeResponseType | null>(null);
	const [loadingOptions, setLoadingOptions] = React.useState<boolean>(false);
	const [txOptions, setTxOptions] = React.useState<GQLNodeResponseType[] | null>(null);

	const [hasFetched, setHasFetched] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	const [loadingMessage, setLoadingMessage] = React.useState<boolean>(false);

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
		if (props.active && terminalRef.current && arProvider.wallet && checkValidAddress(inputProcessId)) {
			fitAddon.current = new FitAddon();

			setTimeout(async () => {
				document.fonts.ready.then(async () => {
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
					termInstance.current.write(`\x1b[90mProcess ID:\x1b[0m \x1b[32m${inputProcessId}\x1b[0m\r\n`);

					await sendMessage(null, 'prompt');

					let commandBuffer = '';

					termInstance.current.onData(async (data: string) => {
						if (data === '\r') {
							console.log(commandBuffer);
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
				});
			}, 150);
		}

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
				// const rawOutput = typeof (response?.Output?.data) === 'object' ? response?.Output?.data?.output ?? '';
				const rawOutput = response?.Output?.data?.output ?? '';
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
			if (loadingOptions) return <Loader sm relative />;
			if (txOptions) {
				return (
					<S.OptionsWrapper className={'scroll-wrapper'}>
						{txOptions.map((tx: GQLNodeResponseType, index: number) => {
							const name = getTagValue(tx.node.tags, 'Name');
							return (
								<Button
									key={index}
									type={'primary'}
									label={name ?? formatAddress(tx.node.id, false)}
									handlePress={() => setInputProcessId(tx.node.id)}
									height={40}
									fullWidth
								/>
							);
						})}
					</S.OptionsWrapper>
				);
			}
		}

		return (
			<S.Console
				className={`${props.noWrapper ? '' : 'border-wrapper-alt3 '}scroll-wrapper`}
				noWrapper={props.noWrapper}
				ref={terminalRef}
			/>
		);
	}

	return props.active ? (
		<>
			<S.Wrapper noWrapper={props.noWrapper}>
				{getConsole()}
				{/* {loadingMessage && (
					<S.LoadingWrapper>
						<Loader sm relative />
					</S.LoadingWrapper>
				)} */}
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
