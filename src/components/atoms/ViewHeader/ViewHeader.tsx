import React from 'react';

import { ViewWrapper } from 'app/styles';

import * as S from './styles';
import { IProps } from './types';

export default function ViewHeader(props: IProps) {
	return (
		<S.HeaderWrapper>
			<ViewWrapper>
				<p>{props.header}</p>
				{props.actions && (
					<S.HeaderActions>
						{props.actions.map((action: React.ReactNode, index: number) => (
							<React.Fragment key={index}>{action}</React.Fragment>
						))}
					</S.HeaderActions>
				)}
			</ViewWrapper>
		</S.HeaderWrapper>
	);
}
