import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { ViewWrapper } from 'app/styles';
import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import { ViewHeader } from 'components/atoms/ViewHeader';
import { MessageList } from 'components/molecules/MessageList';
import { ProcessRead } from 'components/molecules/ProcessRead';
import { ASSETS, DEFAULT_MESSAGE_TAGS, URLS } from 'helpers/config';
import { getTxEndpoint } from 'helpers/endpoints';
import { ButtonType, GQLNodeResponseType } from 'helpers/types';
import { formatAddress, getTagValue } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { usePermawebProvider } from 'providers/PermawebProvider';

import { Metrics } from './Metrics';
import * as S from './styles';

export default function Landing() {
	const arProvider = useArweaveProvider();
	const permawebProvider = usePermawebProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	return (
		<S.Wrapper>
			<S.HeaderWrapper>
				<ViewHeader header={language.network} />
			</S.HeaderWrapper>
			<S.BodyWrapper>
				<Metrics />
				{/* <ViewWrapper>
					<S.SectionMain>
						<S.SectionHeader>
							<p>Active Nodes</p>
						</S.SectionHeader>
						<S.ProcessReadWrapper>
							<ProcessRead processId={'xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10'} autoRun hideOutput />
							<ProcessRead processId={'lfAiWty6Vhii7qIHtYYobBCyX2Ntm5_3pzcy-gwte9A'} autoRun hideOutput />
							<ProcessRead processId={'SaXnsUgxJLkJRghWQOUs9-wB0npVviewTkUbh2Yk64M'} autoRun hideOutput />
							<ProcessRead processId={'xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10'} autoRun hideOutput />
							<ProcessRead processId={'lfAiWty6Vhii7qIHtYYobBCyX2Ntm5_3pzcy-gwte9A'} autoRun hideOutput />
							<ProcessRead processId={'SaXnsUgxJLkJRghWQOUs9-wB0npVviewTkUbh2Yk64M'} autoRun hideOutput />
						</S.ProcessReadWrapper>
					</S.SectionMain>
				</ViewWrapper> */}
				{/* <ViewWrapper>
					<S.SectionMain>
						<S.SectionHeader>
							<p>Recent Messages</p>
						</S.SectionHeader>
						<MessageList
							txId={'0syT13r0s0tgPmIed95bJnuSqaD29HQNN8D3ElLSrsc'}
							recipient={null}
							parentId={'0syT13r0s0tgPmIed95bJnuSqaD29HQNN8D3ElLSrsc'}
						/>
					</S.SectionMain>
				</ViewWrapper> */}
			</S.BodyWrapper>
		</S.Wrapper>
	);
}
