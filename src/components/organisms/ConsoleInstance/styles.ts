import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div<{ noWrapper?: boolean, fullScreenMode: boolean }>`
	min-height: 500px;
	height: ${(props) => props.noWrapper ? `calc(100vh - 145px)` : `calc(100vh - 195px)`};
	width: 100%;
	position: relative;
	display: flex;
	gap: ${(props) => props.fullScreenMode ? '0' : '25px'};
	background: ${(props) => props.theme.colors.view.background};

	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
	}
`;

export const ActionsWrapper = styled.div<{ noWrapper?: boolean, fullScreenMode: boolean; }>`
	position: absolute;
	bottom: ${(props) => props.noWrapper && !props.fullScreenMode ? '0' : '20px'};
	right: ${(props) => props.noWrapper && !props.fullScreenMode ? '0' : '20px'};

	display: flex;
	flex-direction: column;
	gap: 15px;

	button {
		padding: 3.5px 0 0 0 !important;
	}
`;

export const LoadWrapper = styled(ActionsWrapper)`
	bottom: 20px;
	right: 27.5px;
	bottom: ${(props) => props.fullScreenMode ? '30px' : '20px'};
	right: ${(props) => props.fullScreenMode ? '42.5px' : '27.5px'};
`;

export const ConsoleWrapper = styled.div<{ editorMode: boolean }>`
	width: ${(props) => props.editorMode ? '50%' : '100%'};
	display: flex;
	gap: 15px;
	flex-direction: ${(props) => props.editorMode ? 'column' : 'row'};

	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
	}
`;

export const ConsoleDivider = styled.div<{ editorMode: boolean }>`
	height: ${(props) => props.editorMode ? '1px' : '100%'};
	width: ${(props) => props.editorMode ? '100%' : '1px'};
	border-top: 1px solid ${(props) => props.editorMode ? props.theme.colors.border.primary : 'transparent'};
	border-left: 1px solid ${(props) => props.editorMode ? 'transparent' : props.theme.colors.border.primary};

	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: 1px;
		width: 100%;
		border-top: 1px solid ${(props) => props.theme.colors.border.primary};
		border-left: 1px solid transparent;
	}
`;

export const Console = styled.div<{ noWrapper?: boolean }>`
	height: 100%;
	flex: 1;
	overflow: hidden !important; 

	.terminal {
		padding: ${(props) => props.noWrapper ? '0' : '15px'};
		height: 100% !important;
		overflow: hidden !important; 
		span {
			letter-spacing: 0 !important;
		}
	}

	.xterm-rows {
		height: 100% !important;
		overflow: hidden !important; 
		letter-spacing: 0;
	}

	.xterm-screen {
		height: 100% !important;
		width: 100% !important;
	}

	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const Editor = styled.div<{ fullScreenMode: boolean }>`
	height: 100%;
	width: 50%;
	position: relative;
	padding: ${(props) => props.fullScreenMode ? '15px' : '0'};

	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const OptionsWrapper = styled.div`
	height: fit-content;
	max-height: calc(100% - 130px);
	width: 450px;
	max-width: 90vw;
	display: flex;
	flex-direction: column;
	gap: 15px;
	margin: 0 auto;
	position: relative;
	top: 20px;
	padding: 20px 15px 20px 30px;
	overflow: scroll;
	border-radius: ${STYLING.dimensions.radius.primary} !important;
`;

export const OptionsHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	p {
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.alt1};
		text-transform: uppercase;
	}
	span {
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const OptionsInput = styled.div`
	margin: 0 0 15px 0;
`;

export const Divider = styled.div`
	height: 1px;
	width: 100%;
	border-top: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const Options = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;

	button {
		border-radius: ${STYLING.dimensions.radius.primary} !important;
	 }
`;

export const OptionsPaginator = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const OptionsLoader = styled.div`
	position: relative;
`;

export const LoadingWrapper = styled.div`
	position: absolute;
	bottom: 0;
	right: 20px;
`;