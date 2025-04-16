import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 25px;
`;

export const HeaderWrapper = styled.div`
	width: 100%;
`;

export const TabsWrapper = styled.div`
	width: 100%;
`;

export const BodyWrapper = styled.div`
	width: 100%;
	padding: 0 25px;
`;

export const TabsContent = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 20px;
	position: relative;
	white-space: nowrap;
	overflow-x: auto;
	overflow-y: hidden;

	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.alt1.background};
	border-radius: ${STYLING.dimensions.radius.alt2};
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
	color: ${(props) =>
		props.active ? props.theme.colors.font.primary : props.theme.colors.font.alt3};
	cursor: pointer;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 12.5px;
	padding: 10px 20px 10px 16.5px;
	border-top-left-radius: ${STYLING.dimensions.radius.primary};
	border-top-right-radius: ${STYLING.dimensions.radius.primary};
	white-space: nowrap;
	transition: all 100ms;
	
	.icon-wrapper {
		position: relative;
		width: 12.5px;
		height: 12.5px;
	}

	.normal-icon,
	.delete-icon {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: all 100ms;
	}

	.normal-icon {
		svg {
			margin: 0 0 2.5px 0;
		}
	}

	.delete-icon {
		display: none;
	}

	.add-icon {
		margin: 3.5px 0 0 0;
	}

	&:hover .normal-icon {
		display: none;
	}

	&:hover .delete-icon {
		display: block;
		
		button {
			background: transparent !important;

			&:hover {
				svg {
			color: ${(props) => props.theme.colors.warning.primary} !important;
			fill: ${(props) => props.theme.colors.warning.primary} !important;
		}
			}
		}
	}

	svg {
		height: 12.5px;
		width: 12.5px;
		color: ${(props) =>
		props.active ? props.theme.colors.font.primary : props.theme.colors.font.alt3};
		fill: ${(props) =>
		props.active ? props.theme.colors.font.primary : props.theme.colors.font.alt3};
	}

	&:hover {
		color: ${(props) => props.theme.colors.font.primary};

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
		bottom: -1.5px;
		background: ${(props) =>
		props.active ? props.theme.colors.tabs.active.background : 'transparent'};
		height: 3.5px;
		border-radius: ${STYLING.dimensions.radius.primary};
		width: calc(100% - 30.5px);
		pointer-events: none;
	}
`;

export const TransactionWrapper = styled.div<{ active: boolean }>`
	display: ${(props) => props.active ? 'block' : 'none'}
`;