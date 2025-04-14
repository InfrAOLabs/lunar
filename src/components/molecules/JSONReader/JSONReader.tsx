import React from 'react';
import { JSONTree } from 'react-json-tree';
import { useTheme } from 'styled-components';

import * as S from './styles';

export default function _JSONTree(props: { data: any, header?: string, placeholder?: string; maxHeight?: number, noWrapper?: boolean }) {
	const currentTheme: any = useTheme();

	const [data, setData] = React.useState<object | null>(null);

	React.useEffect(() => {
		if (props.data) setData(safelyParseNestedJSON(props.data));
	}, [props.data])

	const safelyParseNestedJSON = (input) => {
		if (typeof input === 'string') {
			try {
				const parsed = JSON.parse(input);
				return safelyParseNestedJSON(parsed);
			} catch (e) {
				return input;
			}
		} else if (Array.isArray(input)) {
			return input.map(safelyParseNestedJSON);
		} else if (input !== null && typeof input === 'object') {
			return Object.fromEntries(Object.entries(input).map(([key, value]) => [key, safelyParseNestedJSON(value)]));
		}
		return input;
	};

	const theme = {
		base00: props.noWrapper ? currentTheme.colors.view.background : currentTheme.colors.container.alt1.background,
		base01: currentTheme.colors.container.alt7.background,
		base02: currentTheme.colors.container.alt7.background,
		base03: currentTheme.colors.container.alt7.background,
		base04: currentTheme.colors.container.alt7.background,
		base05: currentTheme.colors.container.alt7.background,
		base06: currentTheme.colors.container.alt7.background,
		base07: currentTheme.colors.container.alt7.background,
		base08: currentTheme.colors.editor.primary,
		base09: currentTheme.colors.editor.alt2,
		base0A: currentTheme.colors.editor.alt2,
		base0B: currentTheme.colors.editor.alt1,
		base0C: currentTheme.colors.editor.primary,
		base0D: currentTheme.colors.editor.primary,
		base0E: currentTheme.colors.editor.primary,
		base0F: currentTheme.colors.editor.primary,
	};

	return (
		<S.Wrapper className={`${props.noWrapper ? '' : 'border-wrapper-alt3 '}scroll-wrapper`} maxHeight={props.maxHeight} noWrapper={props.noWrapper}>
			{props.header && (
				<S.Header>
					<p>{props.header}</p>
				</S.Header>
			)}
			{data ? (
				<JSONTree data={data} hideRoot={true} theme={theme} shouldExpandNodeInitially={() => true} />
			) : (
				<S.Placeholder>
				<p>{props.placeholder ?? 'No data to display'}</p>
				</S.Placeholder>
			)}
		</S.Wrapper>
	)
}
