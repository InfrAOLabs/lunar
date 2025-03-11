import React from 'react';
import { ReactSVG } from 'react-svg';

import { GQLNodeResponseType } from '@permaweb/libs';

import { TxAddress } from 'components/atoms/TxAddress';
import { ASSETS, DEFAULT_MESSAGE_TAGS } from 'helpers/config';
import { getRelativeDate, getTagValue } from 'helpers/utils';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { usePermawebProvider } from 'providers/PermawebProvider';

import * as S from './styles';

function Message(props: { element: GQLNodeResponseType; parentId: string }) {
	const [open, setOpen] = React.useState<boolean>(false);

	return (
		<>
			<S.ElementWrapper key={props.element.node.id} onClick={() => setOpen((prev) => !prev)} open={open}>
				<S.ID>
					<TxAddress address={props.element.node.id} />
				</S.ID>
				<S.Action>
					<p>{getTagValue(props.element.node.tags, 'Action')}</p>
				</S.Action>
				<S.To>
					<TxAddress address={props.element.node.id} />
				</S.To>
				<S.Time>
					<p>{getRelativeDate(props.element.node.block.timestamp * 1000)}</p>
				</S.Time>
				<S.Results open={open}>
					<ReactSVG src={ASSETS.arrow} />
				</S.Results>
			</S.ElementWrapper>
			{open && (
				<MessageList
					txId={props.element.node.id}
					recipient={props.element.node.recipient}
					parentId={props.parentId}
					childList
				/>
			)}
		</>
	);
}

export default function MessageList(props: {
	txId: string;
	recipient: string | null;
	parentId: string;
	childList?: boolean;
}) {
	const permawebProvider = usePermawebProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [currentData, setCurrentData] = React.useState<GQLNodeResponseType[] | null>(null);
	const [loadingMessages, setLoadingMessages] = React.useState<boolean>(false);

	// TODO: Result type
	React.useEffect(() => {
		(async function () {
			if (props.txId) {
				setLoadingMessages(true);
				try {
					if (!props.childList) {
						const gqlResponse = await permawebProvider.libs.getGQLData({
							tags: [...DEFAULT_MESSAGE_TAGS, { name: 'From-Process', values: [props.txId] }],
							paginator: 20, // TODO
						});
						setCurrentData(gqlResponse.data);
					} else {
						const resultResponse = await permawebProvider.ao.result({
							process: props.recipient,
							message: props.txId,
						});

						if (resultResponse && !resultResponse.error) {
							const gqlResponse = await permawebProvider.libs.getGQLData({
								tags: [
									...DEFAULT_MESSAGE_TAGS,
									{ name: 'From-Process', values: [props.recipient] },
									{
										name: 'Reference',
										values: resultResponse.Messages.map((result) => getTagValue(result.Tags, 'Reference')),
									},
								],
							});

							setCurrentData(gqlResponse.data);
						} else {
							setCurrentData([]);
						}
					}
				} catch (e: any) {
					console.error(e);
				}
				setLoadingMessages(false);
			}
		})();
	}, [props.txId, permawebProvider.libs]);

	function getMessage() {
		let message: string = language.associatedMessagesInfo;
		if (loadingMessages) message = `${language.associatedMessagesLoading}...`;
		if (currentData?.length <= 0) message = language.associatedMessagesNotFound;
		return (
			<S.UpdateWrapper childList={props.childList}>
				<div className={'update-wrapper'}>
					<span>{message}</span>
				</div>
			</S.UpdateWrapper>
		);
	}

	return currentData?.length > 0 ? (
		<S.Wrapper childList={props.childList}>
			{!props.childList && (
				<S.HeaderWrapper>
					<S.ID>
						<p>{language.id}</p>
					</S.ID>
					<S.Action>
						<p>{language.action}</p>
					</S.Action>
					<S.To>
						<p>{language.to}</p>
					</S.To>
					<S.Time>
						<p>{language.time}</p>
					</S.Time>
					<S.Results>
						<p>{language.results}</p>
					</S.Results>
				</S.HeaderWrapper>
			)}
			<S.BodyWrapper childList={props.childList}>
				{currentData.map((element: GQLNodeResponseType) => (
					<Message key={element.node.id} element={element} parentId={props.parentId} />
				))}
			</S.BodyWrapper>
		</S.Wrapper>
	) : (
		getMessage()
	);
}
