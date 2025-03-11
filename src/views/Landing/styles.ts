import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const HeaderWrapper = styled.div`
	
`;

export const BodyWrapper = styled.div``;

export const Section = styled.div``;

export const SectionHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 0 15px 0;
	p {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const ProcessReadWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 16px;
`;