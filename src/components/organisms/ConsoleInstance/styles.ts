import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div<{ noWrapper?: boolean }>`
	height: ${(props) => props.noWrapper ? `calc(100vh - 270px)` : `calc(100vh - 395px)`};
	width: 100%;
	position: relative;
`;

export const Console = styled.div<{ noWrapper?: boolean }>`
	height: 100%;
	width: 100%;
	
	/* .xterm .xterm-viewport {
		background-color: transparent !important;
		overflow: auto;
		::-webkit-scrollbar {
			display: none;
		}
		
		-ms-overflow-style: none;
		scrollbar-width: none;
	} */

	.terminal {
		padding: ${(props) => props.noWrapper ? '0' : '15px'};
		height: 100% !important;
	}

	.xterm-rows {
		height: 100% !important;

		letter-spacing: 0;
	}

	.xterm-screen {
		height: 100% !important;
		width: 100% !important;
	}
`

export const OptionsWrapper = styled.div`
	height: 100%;
	width: 450px;
	max-width: 90vw;
	display: flex;
	flex-direction: column;
	gap: 15px;
	margin: 0 auto;
	 
	 button {
		border-radius: ${STYLING.dimensions.radius.primary} !important;
	 }
`;

export const LoadingWrapper = styled.div`
	position: absolute;
	bottom: 0;
	right: 20px;
`;