import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
`;

export const Console = styled.div`
	padding: 15px;
	.xterm .xterm-viewport {
		background-color: transparent !important;
		overflow: auto;
		::-webkit-scrollbar {
			display: none;
		}
		
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
`