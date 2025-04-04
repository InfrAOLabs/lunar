import { JSONTree } from 'react-json-tree';
import { useTheme } from 'styled-components';

import * as S from './styles';

export default function _JSONTree(props: { data: any, header?: string, maxHeight?: number }) {
	const currentTheme: any = useTheme();

	const theme = {
		base00: currentTheme.colors.container.alt1.background,
		base01: currentTheme.colors.container.alt7.background,
		base02: currentTheme.colors.container.alt7.background,
		base03: currentTheme.colors.container.alt7.background,
		base04: currentTheme.colors.container.alt7.background,
		base05: currentTheme.colors.container.alt7.background,
		base06: currentTheme.colors.container.alt7.background,
		base07: currentTheme.colors.container.alt7.background,

		base08: '#f92672',
		base09: currentTheme.colors.editor.alt2,
		base0A: currentTheme.colors.editor.alt2,
		base0B: currentTheme.colors.editor.alt1,
		base0C: currentTheme.colors.editor.primary,
		base0D: currentTheme.colors.editor.primary,
		base0E: '#ae81ff',
		base0F: '#cc6633',
	};

	return props.data ? (
		<S.Wrapper className={'border-wrapper-alt3 scroll-wrapper'} maxHeight={props.maxHeight}>
			{props.header && (
				<S.Header>
					<p>{props.header}</p>
				</S.Header>
			)}
			<JSONTree data={props.data} hideRoot={true} theme={theme} shouldExpandNodeInitially={() => true} />
		</S.Wrapper>
	) : null;
}
