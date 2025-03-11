import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	width: 100%;
`;

export const HeaderWrapper = styled.div`
	width: 100%;
`;

export const BodyWrapper = styled.div`
	width: 100%;
`;

export const TabsHeaderWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 20px;
	position: relative;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const TabHeader = styled.div`
	position: relative;
`;

export const TabDivider = styled.div`
	height: 22.5px;
	width: 1px;
	margin: 3.5px 0 0 0;
	border-left: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const DeleteAction = styled.div`
	display: none;
	position: absolute;
    right: 4.5px;
    right: 0;
    bottom: 50%;
    transform: translate(0, 25%);
	svg {
		margin: 3.5px 0 0 0 !important;
	}

	&:hover {
		button {
			background: transparent !important;
		}
		svg {
			color: ${(props) => props.theme.colors.warning.primary} !important;
			fill: ${(props) => props.theme.colors.warning.primary} !important;
		}
	}
`;

export const TabAction = styled.div<{ active: boolean }>`
	font-size: ${(props) => props.theme.typography.size.xSmall};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	font-family: ${(props) => props.theme.typography.family.primary};
	color: ${(props) => (props.active ? props.theme.colors.font.primary : props.theme.colors.font.alt3)};
	cursor: pointer;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 12.5px;
	padding: 10px 20px;
	border-top-left-radius: ${STYLING.dimensions.radius.primary};
	border-top-right-radius: ${STYLING.dimensions.radius.primary};

	svg {
		height: 12.5px;
		width: 12.5px;
		margin: 5px 0 0 0;
		color: ${(props) => (props.active ? props.theme.colors.font.primary : props.theme.colors.font.alt3)};
		fill: ${(props) => (props.active ? props.theme.colors.font.primary : props.theme.colors.font.alt3)};
	}

	&:hover {
		${DeleteAction} {
			display: block;
		}

		color: ${(props) => props.theme.colors.font.primary};
		/* background: ${(props) => props.theme.colors.button.primary.active.background}; */

		svg {
			color: ${(props) => props.theme.colors.font.primary};
			fill: ${(props) => props.theme.colors.font.primary};
		}	
	}

	&:after {
		display: block;
		content: '';
		position: absolute;
		z-index: 1;
		left: 50%;
		transform: translate(-50%, 0);
		bottom: -1px;
		background: ${(props) =>
			props.active ? props.theme.colors.tabs.active.background : 'transparent'};
		height: 3.5px;
		border-radius: ${STYLING.dimensions.radius.primary};
		width: 100%;
		pointer-events: none;
	}
`;

export const TransactionWrapper = styled.div<{ active: boolean }>`
	display: ${(props) => props.active ? 'block' : 'none'}
`;