import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`;

export const TabsHeader = styled.div<{ useFixed: boolean }>`
	width: 100%;
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		position: relative;
		top: auto;
	}
`;

export const Tabs = styled.div`
	display: flex;
	align-items: center;
	gap: 30px;
	overflow-x: auto;
`;

export const Content = styled.div``;

export const Tab = styled.div<{ active: boolean }>`
	display: flex;
	flex: 1;
	justify-content: center;
	align-items: center;
	position: relative;
	button {
		border-radius: ${STYLING.dimensions.radius.primary} !important;
		flex: 1;
		span {
			font-size: ${(props) => props.theme.typography.size.xSmall} !important;
		}
	}
`;

export const View = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	margin: 25px 0 0 0;
`;
