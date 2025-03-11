import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const BodyWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 15px;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
	}
`;

export const BodySectionsWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	gap: 25px;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
	}
`;

export const SectionWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 25px;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
		flex-direction: column;
	}
`;

export const MessagesWrapper = styled(SectionWrapper)`
	width: 100%;
	
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const Section = styled.div`
	height: fit-content;
	flex: 1;
	padding: 15px;
	
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const TagsSection = styled(Section)`
	height: 297.5px;
`;

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

export const InputWrapper = styled.form`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 20px;
	margin: 5px 0 0 0;

	button {
		margin: 7.5px 0 0 0;

		span {
			
		}
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