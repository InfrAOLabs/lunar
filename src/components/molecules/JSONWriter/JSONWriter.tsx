import React from 'react';

import { Button } from 'components/atoms/Button';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

export default function JSONWriter(props: {
	initialData: object;
	handleSubmit: (data: object) => void;
	loading: boolean;
}) {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [jsonString, setJsonString] = React.useState(
		JSON.stringify(props.initialData, null, 4)
	);
	const [error, setError] = React.useState(null);

	const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
	const numbersRef = React.useRef<HTMLDivElement>(null);

	// Auto-resize the textarea height based on its content.
	const autoResize = () => {
		const ta = textAreaRef.current;
		if (ta) {
			ta.style.height = 'auto';
			ta.style.height = ta.scrollHeight + 'px';
		}
	};

	// Called whenever the content of the textarea changes.
	const handleChange = (event) => {
		const updatedString = event.target.value;
		setJsonString(updatedString);

		try {
			JSON.parse(updatedString);
			setError(null);
		} catch (err) {
			setError('Invalid JSON: please check your syntax.');
		}

		// Auto-resize the textarea whenever the content changes.
		autoResize();
	};

	// Submit the JSON if there is no error.
	function submitHandler() {
		if (!error) {
			const parsedData = JSON.parse(jsonString);
			props.handleSubmit(parsedData);
		}
	}

	// Keyboard handling:
	// - When "{" is typed, insert a matching "}" and place the caret inside.
	// - Cmd/Ctrl+Enter submits the JSON.
	// - Plain Enter inserts a new line with proper indentation.
	const handleKeyDown = (event) => {
		const textarea = event.target;
		const { selectionStart, selectionEnd } = textarea;

		// Auto-close braces.
		if (event.key === '{' || event.key === '[') {
			event.preventDefault();

			// Insert "{}" and set the caret between the braces.
			const insertText = event.key === '{' ? '{}' : '[]';
			const newValue =
				jsonString.substring(0, selectionStart) +
				insertText +
				jsonString.substring(selectionEnd);
			setJsonString(newValue);

			// Update the caret position.
			setTimeout(() => {
				textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
			}, 0);
			autoResize();
			return;
		}

		if (event.key === 'Enter') {
			// Check for submission shortcut (Cmd/Ctrl + Enter).
			if (event.metaKey || event.ctrlKey) {
				event.preventDefault();
				submitHandler();
			} else {
				event.preventDefault();
				// Determine the current line and its indentation.
				const textBeforeCaret = jsonString.substring(0, selectionStart);
				const lastNewLine = textBeforeCaret.lastIndexOf('\n');
				const currentLine = textBeforeCaret.slice(lastNewLine + 1);
				const indentMatch = currentLine.match(/^\s*/);
				const indent = indentMatch ? indentMatch[0] : '';

				// Insert a new line with the same indentation.
				const insertText = '\n' + indent;
				const newValue =
					jsonString.substring(0, selectionStart) +
					insertText +
					jsonString.substring(selectionEnd);
				setJsonString(newValue);

				// Adjust the caret position and auto-resize.
				setTimeout(() => {
					textarea.selectionStart = textarea.selectionEnd =
						selectionStart + insertText.length;
					autoResize();
				}, 0);
			}
		}

		if (event.key === 'Tab') {
			event.preventDefault();
			const insertText = '    '; // 4 spaces
			const newValue =
				jsonString.substring(0, selectionStart) +
				insertText +
				jsonString.substring(selectionEnd);
			setJsonString(newValue);

			// Update the caret position and auto-resize.
			setTimeout(() => {
				textarea.selectionStart = textarea.selectionEnd =
					selectionStart + insertText.length;
				autoResize();
			}, 0);
			return;
		}
	};

	// Sync scrolling between the textarea and the line numbers.
	const handleScroll = () => {
		if (textAreaRef.current && numbersRef.current) {
			numbersRef.current.scrollTop = textAreaRef.current.scrollTop;
		}
	};

	const lines = jsonString.split('\n');

	// Auto-resize on mount and whenever jsonString updates.
	React.useEffect(() => {
		autoResize();
	}, [jsonString]);

	return (
		<S.Wrapper>
			<S.EditorWrapper className={'border-wrapper-alt3'}>
				<S.LinesWrapper ref={numbersRef}>
					{lines.map((_, index) => (
						<span key={index}>{index + 1}</span>
					))}
				</S.LinesWrapper>
				<S.Editor>
					<textarea
						ref={textAreaRef}
						className={'scroll-wrapper'}
						value={jsonString}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						onScroll={handleScroll}
					/>
				</S.Editor>
			</S.EditorWrapper>

			<S.ActionsWrapper>
				<Button
					type={'alt1'}
					label={`${language.run} (⌘ + ⏎)`}
					handlePress={submitHandler}
					disabled={props.loading || error !== null}
					loading={props.loading}
				/>
			</S.ActionsWrapper>
			{error && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>}
		</S.Wrapper>
	);
}