import styled from 'styled-components';

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const EditorWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: flex-start;
	position: relative;
	padding: 15px;
`;

export const LinesWrapper = styled.div`
	user-select: none;
	padding: 0 10px 0 0;
	display: flex;
	flex-direction: column;
	span {
		color: ${(props) => props.theme.colors.font.alt2};
		font-family: ${(props) => props.theme.typography.family.alt2};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-size: ${(props) => props.theme.typography.size.xxSmall};
	}
`;

export const Editor = styled.div`
	width: 100%;
	position: relative;
	textarea {
		min-height: 400px;
		width: 100%;
		border: none;
		padding: 0;
		color: ${(props) => props.theme.colors.font.primary};
		font-family: ${(props) => props.theme.typography.family.alt2};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		line-height: 1.5;
	}
`;

export const ActionsWrapper = styled.div`
	width: fit-content;
	display: flex;
	align-items: center;
	gap: 20px;
	position: absolute;
	bottom: 20px;
	right: 20px;
`;

export const ErrorWrapper = styled.div`
	span {
		color: ${(props) => props.theme.colors.warning.primary};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		font-size: ${(props) => props.theme.typography.size.xxSmall};
	}
`;