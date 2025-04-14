import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 25px;
`;

export const HeaderWrapper = styled.form`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
`;

export const HeaderActionsWrapper = styled.div`
	display: flex;
	align-items: center;
	/* justify-content: space-between; */
	gap: 20px;

	/* button {
		margin: 7.5px 0 0 0;

		span {
			
		}
	} */
`

export const BodyWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 25px;
`;

export const InfoWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	gap: 25px;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
	}
`;

export const ReadWrapper = styled.div`
	width: calc(100% - 475px);
`;

export const TagsWrapper = styled.div`
	width: 450px;
`;
export const MessagesWrapper = styled.div`
	width: 100%;
`;

export const Section = styled.div`
	height: fit-content;
	flex: 1;
	padding: 15px;
	
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const TagsSection = styled(Section)``;

export const SectionFull = styled.div`
	width: 100%;
`;

export const SectionHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 0 15px 0;
	p {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const SectionHeaderFull = styled(SectionHeader)`
	padding: 15px;
	margin: 0;
	border-top: 1px solid ${(props) => props.theme.colors.border.primary};
	border-right: 1px solid ${(props) => props.theme.colors.border.primary};
	border-left: 1px solid ${(props) => props.theme.colors.border.primary};
    border-top-right-radius: ${STYLING.dimensions.radius.alt1};
    border-top-left-radius: ${STYLING.dimensions.radius.alt1};
`;

export const SectionFullUpdateWrapper = styled.div`
	padding: 0 15px 15px 15px;
`;

export const SearchWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
	position: relative;
`;

export const SearchInputWrapper = styled.div`
	width: 510px;
	position: relative;

	input {
		padding: 10px 10px 10px 42.5px !important;
	}

	svg {
		height: 15px;
		width: 15px;
		color: ${(props) => props.theme.colors.font.alt1};
		fill: ${(props) => props.theme.colors.font.alt1};
		position: absolute;
		z-index: 1;
		top: 11.5px;
		left: 14.5px;
	}
`;

export const InputActions = styled.div`
	width: 100%;
	display: flex;
	gap: 15px;
	justify-content: flex-end;
	margin: 15px 0 0 0;
`;

export const OverviewWrapper = styled.div`
	height: fit-content;
	display: flex;
	flex-direction: column;
	gap: 10px;

	@media (max-width: ${STYLING.cutoffs.secondary}) {
		gap: 20px;
	}
`;

export const OverviewLine = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	p,
	span {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}

	p {
		color: ${(props) => props.theme.colors.font.primary};
		text-align: right;
	}

	span {
		color: ${(props) => props.theme.colors.font.alt1};
	}

	@media (max-width: ${STYLING.cutoffs.secondary}) {
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		gap: 5px;

		p {
			text-align: left;
		}
	}
`;

export const OverviewDivider = styled.div`
	height: 1px;
	width: 100%;
	margin: 5px 0 0 0;
	border-top: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const MessagesSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const MessagesPlaceholder = styled.div`
	padding: 0 15px 15px 15px;
	border-left: 1px solid ${(props) => props.theme.colors.border.primary};
	border-right: 1px solid ${(props) => props.theme.colors.border.primary};
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};	
	border-bottom-left-radius: ${STYLING.dimensions.radius.alt1};
	border-bottom-right-radius: ${STYLING.dimensions.radius.alt1};

	span {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
	}
`;

export const Placeholder = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;
	padding: 80px 0;
`;

export const PlaceholderIcon = styled.div`
	height: 150px;
	width: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.theme.colors.container.alt1.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: 50%;

	svg {
		height: 85px;
		width: 85px;
		color: ${(props) => props.theme.colors.icon.primary.fill};
		fill: ${(props) => props.theme.colors.icon.primary.fill};
		margin: 7.5px 0 0 0;
	}
`;

export const PlaceholderDescription = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;

	p,span {
		text-align: center;
	}
	
	p {
		font-size: ${(props) => props.theme.typography.size.small};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
	
	span {
		display: block;
		max-width: 350px;
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;