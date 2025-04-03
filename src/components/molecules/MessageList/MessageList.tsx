import React from 'react';
import { ReactSVG } from 'react-svg';
import { DefaultGQLResponseType, GQLNodeResponseType } from '@permaweb/libs';

import { Button } from 'components/atoms/Button';
import { JSONTree } from 'components/atoms/JSONTree';
import { Panel } from 'components/atoms/Panel';
import { TxAddress } from 'components/atoms/TxAddress';
import { ASSETS, DEFAULT_MESSAGE_TAGS } from 'helpers/config';
import { MessageFilterType } from 'helpers/types';
import { formatCount, getRelativeDate, getTagValue } from 'helpers/utils';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { usePermawebProvider } from 'providers/PermawebProvider';

import * as S from './styles';

function Message(props: { element: GQLNodeResponseType; parentId: string; lastChild?: boolean }) {
	const permawebProvider = usePermawebProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [open, setOpen] = React.useState<boolean>(false);
	const [result, setResult] = React.useState<any>(null);
	const [showViewResult, setShowViewResult] = React.useState<boolean>(false);

	React.useEffect(() => {
		(async function () {
			if (!result && showViewResult) {
				try {
					const messageResult = await permawebProvider.ao.result({
						process: props.parentId,
						message: props.element.node.id,
					});
					setResult(messageResult);
				} catch (e: any) {
					console.error(e);
				}
			}
		})();
	}, [result, showViewResult]);

	return (
		<>
			<S.ElementWrapper
				key={props.element.node.id}
				className={'message-list-element'}
				onClick={() => setOpen((prev) => !prev)}
				open={open}
				lastChild={props.lastChild}
			>
				<S.ID>
					<TxAddress address={props.element.node.id} />
				</S.ID>
				<S.Action>
					<p>{getTagValue(props.element.node.tags, 'Action') ?? language.none}</p>
				</S.Action>
				<S.To>
					<TxAddress address={props.element.node.id} />
				</S.To>
				<S.Output>
					<Button
						type={'alt3'}
						label={language.view}
						handlePress={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setShowViewResult((prev) => !prev);
						}}
					/>
				</S.Output>
				<S.Time>
					<p>
						{props.element.node?.block?.timestamp ? getRelativeDate(props.element.node.block.timestamp * 1000) : '-'}
					</p>
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
					isOverallLast={props.lastChild}
				/>
			)}

			<Panel open={showViewResult} width={550} header={'Result'} handleClose={() => setShowViewResult(false)}>
				<S.ResultWrapper>
					<S.ResultOutput>{result ? <JSONTree data={result} /> : null}</S.ResultOutput>
				</S.ResultWrapper>
			</Panel>
		</>
	);
}

export default function MessageList(props: {
	txId: string;
	recipient: string | null;
	parentId: string;
	childList?: boolean;
	isOverallLast?: boolean;
}) {
	const permawebProvider = usePermawebProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [currentFilter, setCurrentFilter] = React.useState<MessageFilterType>('incoming');
	const [currentData, setCurrentData] = React.useState<GQLNodeResponseType[] | null>(null);
	const [loadingMessages, setLoadingMessages] = React.useState<boolean>(false);

	const [incomingCount, setIncomingCount] = React.useState<number | null>(null);
	const [outgoingCount, setOutgoingCount] = React.useState<number | null>(null);

	// TODO: Result type
	React.useEffect(() => {
		(async function () {
			if (props.txId) {
				setLoadingMessages(true);
				try {
					if (!props.childList) {
						let gqlResponse: DefaultGQLResponseType;
						switch (currentFilter) {
							case 'incoming':
								gqlResponse = await permawebProvider.libs.getGQLData({
									tags: [...DEFAULT_MESSAGE_TAGS],
									recipients: [props.txId],
									paginator: 20, // TODO
								});
								setIncomingCount(gqlResponse.count);
								break;
							case 'outgoing':
								gqlResponse = await permawebProvider.libs.getGQLData({
									tags: [...DEFAULT_MESSAGE_TAGS, { name: 'From-Process', values: [props.txId] }],
									paginator: 20, // TODO
								});
								setOutgoingCount(gqlResponse.count);
								break;
							default:
								break;
						}
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
	}, [props.txId, currentFilter, permawebProvider.libs]);

	function getMessage() {
		let message: string = language.associatedMessagesInfo;
		if (loadingMessages) message = `${language.associatedMessagesLoading}...`;
		if (currentData?.length <= 0) message = language.associatedMessagesNotFound;
		return (
			<S.UpdateWrapper childList={props.childList}>
				<p>{message}</p>
			</S.UpdateWrapper>
		);
	}

	return (
		<div>
			{!props.childList && (
				<S.Header>
					<p>{language.messages}</p>
					<S.HeaderActions>
						<Button
							type={'alt3'}
							label={`${language.incoming}${incomingCount ? ` (${formatCount(incomingCount.toString())})` : ''}`}
							handlePress={() => setCurrentFilter('incoming')}
							active={currentFilter === 'incoming'}
						/>
						<Button
							type={'alt3'}
							label={`${language.outgoing}${outgoingCount ? ` (${formatCount(outgoingCount.toString())})` : ''}`}
							handlePress={() => setCurrentFilter('outgoing')}
							active={currentFilter === 'outgoing'}
						/>
					</S.HeaderActions>
				</S.Header>
			)}
			{currentData?.length > 0 ? (
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
							<S.Output>
								<p>{language.output}</p>
							</S.Output>
							<S.Time>
								<p>{language.time}</p>
							</S.Time>
							<S.Results>
								<p>{language.results}</p>
							</S.Results>
						</S.HeaderWrapper>
					)}
					<S.BodyWrapper
						childList={props.childList}
						isOverallLast={true} // for top-level lists you can assume it is overall last
					>
						{currentData.map((element: GQLNodeResponseType, index: number) => {
							const isLast = index === currentData.length - 1;
							return (
								<Message key={element.node.id} element={element} parentId={props.parentId} lastChild={isLast} />
							);
						})}
					</S.BodyWrapper>
				</S.Wrapper>
			) : (
				getMessage()
			)}
		</div>
	);
}
