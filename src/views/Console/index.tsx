import React from 'react';
import { useTheme } from 'styled-components';
import { Terminal } from 'xterm';

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
					cursor: theme.colors.indicator.active
				},
			});
			// Attach the terminal to the container
			termInstance.current.open(terminalRef.current);

			// Write initial welcome message and prompt
			// termInstance.current.write('Lunar Console\r\n');
			termInstance.current.write('> ');

			// Simple command buffer to store user input
			let commandBuffer = '';

			// Listen for user input
			termInstance.current.onData((data) => {
				if (data === '\r') {
					// Enter key pressed
					termInstance.current.write('\r\n');
					// Process the command (for now, just echo it)
					termInstance.current.write(`You typed: ${commandBuffer}\r\n`);
					// Reset the buffer and show a new prompt
					commandBuffer = '';
					termInstance.current.write('$ ');
				} else if (data === '\u007F') {
					// Backspace (DEL) pressed
					// Only remove a character if there's something in the buffer
					if (commandBuffer.length > 0) {
						commandBuffer = commandBuffer.slice(0, -1);
						// Move cursor back, clear the character, and move cursor back again
						termInstance.current.write('\b \b');
					}
				} else {
					// Add the typed character to the command buffer and display it
					commandBuffer += data;
					termInstance.current.write(data);
				}
			});
		}

		// Cleanup the terminal instance on component unmount
		return () => {
			if (termInstance.current) {
				termInstance.current.dispose();
			}
		};
	}, []);

	return (
		<S.Wrapper>
			<ViewHeader header={language.console} />
			<div
				ref={terminalRef}
				style={{
					width: '100%',
					height: '300px',
					backgroundColor: '#1e1e1e',
					overflow: 'hidden',
				}}
			/>
		</S.Wrapper>
	);
}
