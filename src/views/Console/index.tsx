import React from 'react';
import { useTheme } from 'styled-components';
import { Terminal } from 'xterm';

import { ViewWrapper } from 'app/styles';
import { ViewHeader } from 'components/atoms/ViewHeader';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { usePermawebProvider } from 'providers/PermawebProvider';

import 'xterm/css/xterm.css';

import * as S from './styles';

export default function Console() {
	const theme = useTheme();

	const arProvider = useArweaveProvider();
	const permawebProvider = usePermawebProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	// Create a ref for the terminal container element
	const terminalRef = React.useRef(null);
	// Store the terminal instance so we can dispose of it when needed
	const termInstance = React.useRef(null);

	React.useEffect(() => {
		if (terminalRef.current) {
			setTimeout(() => {
				// Wait until all fonts are loaded
				document.fonts.ready.then(() => {
					// Initialize the terminal instance with custom options
					termInstance.current = new Terminal({
						cols: 80,
						rows: 24,
						cursorBlink: false,
						fontFamily: theme.typography.family.alt2,
						fontSize: 14,
						fontWeight: 600,
						theme: {
							background: theme.colors.view.background,
							foreground: theme.colors.font.primary,
							cursor: theme.colors.indicator.active,
						},
					});
					// Attach the terminal to the container
					termInstance.current.open(terminalRef.current);

					// Write initial welcome message and prompt
					termInstance.current.write('Welcome to AOS' + '\r\n\r\n');
					termInstance.current.write('AOS Client Version: 2.0.6. 2024' + '\r\n\r\n');
					termInstance.current.write('> ');

					// Simple command buffer to store user input
					let commandBuffer = '';

					// Listen for user input
					termInstance.current.onData((data) => {
						if (data === '\r') {
							termInstance.current.write('\r\n');
							termInstance.current.write(`You typed: ${commandBuffer}\r\n`);
							commandBuffer = '';
							termInstance.current.write('> ');
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
			}, 0);
		}

		return () => {
			if (termInstance.current) {
				termInstance.current.dispose();
			}
		};
	}, [theme]);

	return (
		<S.Wrapper>
			<ViewHeader header={language.console} />
			<ViewWrapper>
				<S.Console className={'border-wrapper-alt3'} ref={terminalRef} />
			</ViewWrapper>
		</S.Wrapper>
	);
}
