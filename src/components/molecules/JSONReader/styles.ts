import styled from 'styled-components';

export const Wrapper = styled.div<{ maxHeight?: number, noWrapper?: boolean }>`
	max-height: ${(props) => props.maxHeight ? `${props.maxHeight.toString()}px` : 'none'};
	padding: ${(props) => props.noWrapper ? '0' : '10px 15px 15px 15px'};
	font-family: ${(props) => props.theme.typography.family.alt2};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	font-size: ${(props) => props.theme.typography.size.xxSmall};

	ul {
		margin: 0 0 0 1.5px !important;
	}
`;

export const Header = styled.div`
	margin: 0 0 2.5px 0;
	p {
		color: ${(props) => props.theme.colors.font.primary};
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		font-size: ${(props) => props.theme.typography.size.lg};
	}
`;

export const Placeholder = styled.div`
	margin: 10px 0 0 0;
	p {
		color: ${(props) => props.theme.colors.font.alt1};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		font-size: ${(props) => props.theme.typography.size.xSmall};
	}
`;