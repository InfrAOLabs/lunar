import styled from 'styled-components';

export const Wrapper = styled.div`
	height: calc(100vh - 275px);
	width: 100%;
	display: flex;
	gap: 25px;
`;

export const EditorWrapper = styled.div`
	height: 100%;
	flex: 1;
`;

export const ResultWrapper = styled.div`
	height: 100%;
	flex: 1;


	> * {
		&:first-child {
			height: 100%;
			overflow: auto;
		}
	}
`;