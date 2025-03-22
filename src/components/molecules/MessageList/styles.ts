import styled, { css } from 'styled-components';

import { STYLING } from 'helpers/config';

export const Header = styled.div`
	padding: 15px;
	margin: 0;
	border-top: 1px solid ${(props) => props.theme.colors.border.primary};
	border-right: 1px solid ${(props) => props.theme.colors.border.primary};
	border-left: 1px solid ${(props) => props.theme.colors.border.primary};
	border-top-right-radius: ${STYLING.dimensions.radius.alt1};
	border-top-left-radius: ${STYLING.dimensions.radius.alt1};
	
	p {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const Wrapper = styled.div<{ childList?: boolean }>`
	width: 100%;
	overflow: auto;
	background: ${(props) => props.childList ? props.theme.colors.container.alt2.background : props.theme.colors.container.primary.background};
`;

export const HeaderWrapper = styled.div`
	height: 40px;
	min-width: 100%;
	width: fit-content;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 15px;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.alt1.background};

	div,p {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.alt1};
	}

	> {
		&:last-child,
		&:nth-child(3),
		&:nth-child(4) {
			display: flex;
			justify-content: flex-end;
			text-align: right;
		}
	}
`;

export const BodyWrapper = styled.div<{ childList?: boolean, open?: boolean }>`
	width: 100%;

	> {
		&:last-child {
			border-bottom-left-radius: ${(props) => props.childList ? '0' : STYLING.dimensions.radius.alt1};
			border-bottom-right-radius: ${(props) => props.childList ? '0' : STYLING.dimensions.radius.alt1};
			border-bottom: 1px solid ${(props) => props.childList ? props.theme.colors.border.alt4 : props.theme.colors.border.primary};
		}
	
		button {
			border-left: 1px solid ${(props) => props.childList ? props.theme.colors.border.alt4 : props.theme.colors.border.primary};
			border-right: 1px solid ${(props) => props.childList ? props.theme.colors.border.alt4 : props.theme.colors.border.primary};
			border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
		}
	}
`;

export const ElementWrapper = styled.button<{ open: boolean }>`
	height: 40px;
	min-width: 100%;
	width: fit-content;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 15px;
	background: ${(props) => props.theme.colors.container.primary.background};

	p {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	&:hover {
		background: ${(props) => props.theme.colors.container.primary.active};
		border-left: 1px solid ${(props) => props.theme.colors.border.alt4};
		border-right: 1px solid ${(props) => props.theme.colors.border.alt4};
		border-bottom: 1px solid ${(props) => props.theme.colors.border.alt4};
	}

	&:hover::after {
		content: "";
		position: absolute;
		height: 1px;
		width: calc(100% + 2px);
		top: -1px;
		left: -1px;
		right: 0;
		bottom: 0;
		border-top: 1px solid ${(props) => props.theme.colors.border.alt4};
		transition: all 100ms;
	}
	
	${(props) =>
		props.open &&
		css`
			border-left: 1px solid ${props.theme.colors.border.alt4} !important;
			border-right: 1px solid ${props.theme.colors.border.alt4} !important;
			border-bottom: 1px solid ${props.theme.colors.border.alt4} !important;
			
			background: ${props.theme.colors.container.primary.active};

			&::after {
				content: "";
				position: absolute;
				height: 1px;
				width: calc(100% + 2px);
				top: -1px;
				left: -1px;
				right: 0;
				bottom: 0;
				border-top: 1px solid ${props.theme.colors.border.alt4};
				transition: all 100ms;
			}
		`}
`;

export const ElementItem = styled.div`
	display: flex;
`;

export const ID = styled(ElementItem)`
	min-width: 165px;
	width: 165px;
`;

export const Action = styled(ElementItem)`
	min-width: 270px;
	width: 270px;
`;

export const To = styled(ElementItem)`
	min-width: 150px;
	width: 150px;
	justify-content: flex-end;
	p {
		text-align: right;
	}
`;

export const Output = styled(ElementItem)`
	min-width: 150px;
	width: 150px;
	justify-content: flex-end;
	p {
		text-align: right;
	}
`;

export const Time = styled(ElementItem)`
	min-width: 165px;
	width: 165px;
	justify-content: flex-end;
	p {
		text-align: right;
	}
`;

export const Results = styled(ElementItem)<{ open?: boolean }>`
	min-width: 90px;
	width: 90px;
	justify-content: flex-end;
	svg {
		height: 15px;
		width: 15px;
		margin: 3.5px 0 0 0;
		transform: rotate(${(props) => props.open ? '180deg' : '0deg'});
		transition: transform 0.15s ease-in-out;
	}
`;

export const UpdateWrapper = styled.div<{ childList?: boolean }>`
	padding: ${(props) => props.childList ? '15px' : '0 15px 15px 15px'};
	border-left: 1px solid ${(props) => props.childList ? props.theme.colors.border.alt4 : props.theme.colors.border.primary};
	border-right: 1px solid ${(props) => props.childList ? props.theme.colors.border.alt4 : props.theme.colors.border.primary};
	border-bottom: 1px solid ${(props) => (props.childList) ? props.theme.colors.border.alt4 : props.theme.colors.border.primary} !important;	
	border-bottom-left-radius: ${(props) => props.childList ? '0' : STYLING.dimensions.radius.alt1};
	border-bottom-right-radius: ${(props) => props.childList ? '0' : STYLING.dimensions.radius.alt1};
	background: ${(props) => props.childList ? props.theme.colors.container.alt2.background : props.theme.colors.container.primary.background};

	p {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;