import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 2.5px;
`;

export const HeaderWrapper = styled.div`
	
`;

export const BodyWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 40px;
`;

export const SectionMain = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const SectionHeader = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.xLg};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const ProcessReadWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 25px;
`;