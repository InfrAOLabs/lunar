import React from 'react';
import { ReactSVG } from 'react-svg';
import { DefaultGQLResponseType, GQLNodeResponseType } from '@permaweb/libs';
import { useTheme } from 'styled-components';

import { Button } from 'components/atoms/Button';
import { IconButton } from 'components/atoms/IconButton';
import { Panel } from 'components/atoms/Panel';
import { TxAddress } from 'components/atoms/TxAddress';
import { JSONReader } from 'components/molecules/JSONReader';
import { ASSETS, DEFAULT_MESSAGE_TAGS } from 'helpers/config';
import { MessageFilterType, TransactionType } from 'helpers/types';
import { formatCount, getRelativeDate, getTagValue } from 'helpers/utils';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { usePermawebProvider } from 'providers/PermawebProvider';

import * as S from './styles';

// TODO: To field value
function Message(props: {
	element: GQLNodeResponseType;
	type: TransactionType;
	parentId: string;
	handleOpen: (id: string) => void;
	lastChild?: boolean;
	isOverallLast?: boolean;
}) {
	const currentTheme: any = useTheme();

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

	function handleShowViewResult(e: any) {
		e.preventDefault();
		e.stopPropagation();
		setShowViewResult((prev) => !prev);
	}

	function getAction() {
		return getTagValue(props.element.node.tags, 'Action') ?? language.none;
	}

	function getActionBackground() {
		const action = getAction();
		switch (action) {
			case 'Eval':
				return currentTheme.colors.actions.eval;
			case 'Info':
				return currentTheme.colors.actions.info;
			case 'Balance':
				return currentTheme.colors.actions.balance;
			case 'Transfer':
				return currentTheme.colors.actions.transfer;
			case 'Debit-Notice':
				return currentTheme.colors.actions.debitNotice;
			case 'Credit-Notice':
				return currentTheme.colors.actions.creditNotice;
			case 'None':
				return currentTheme.colors.actions.none;
			default:
				return currentTheme.colors.actions.other;
		}
	}

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
					<IconButton
						type={'alt1'}
						src={ASSETS.go}
						handlePress={() => props.handleOpen(props.element.node.id)}
						dimensions={{
							wrapper: 22.5,
							icon: 12.5,
						}}
						tooltip={'Open in new tab'}
						tooltipPosition={'bottom-left'}
					/>
					<TxAddress address={props.element.node.id} />
				</S.ID>
				<S.ActionValue background={getActionBackground()}>
					<div className={'action-indicator'}>
						<p>{getAction()}</p>
						<S.ActionTooltip className={'info'}>
						<span>{getAction()}</span>
					</S.ActionTooltip>
					</div>
				</S.ActionValue>
				<S.To>
					<TxAddress address={props.element.node.id} />
				</S.To>
				<S.Output>
					<Button type={'alt3'} label={language.view} handlePress={(e) => handleShowViewResult(e)} />
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
					type={props.type}
					recipient={props.element.node.recipient}
					parentId={props.parentId}
					handleMessageOpen={(id: string) => props.handleOpen(id)}
					childList
					isOverallLast={props.isOverallLast && props.lastChild}
				/>
			)}

			<Panel open={showViewResult} width={550} header={language.result} handleClose={() => setShowViewResult(false)}>
				<S.ResultWrapper>
					<S.ResultInfo>
						<S.ResultInfoLine>
							<S.ResultInfoLineValue>
								<p>Message: </p>
							</S.ResultInfoLineValue>
							<TxAddress address={props.element.node.id} />
						</S.ResultInfoLine>
						<S.ResultInfoLine>
							<S.ResultInfoLineValue>
								<p>Action: </p>
							</S.ResultInfoLineValue>
							<S.ResultInfoLineValue>
								<p>{getAction()}</p>
							</S.ResultInfoLineValue>
						</S.ResultInfoLine>
					</S.ResultInfo>
					<S.ResultOutput>
						{result ? (
							<JSONReader data={result} header={language.output} noWrapper />
						) : (
							<p>{`${language.loading}...`}</p>
						)}
					</S.ResultOutput>
					<S.ResultActions>
						<Button type={'primary'} label={language.close} handlePress={() => setShowViewResult(false)} />
					</S.ResultActions>
				</S.ResultWrapper>
			</Panel>
		</>
	);
}

// TODO: Pagination
export default function MessageList(props: {
	txId: string;
	type: TransactionType;
	recipient: string | null;
	parentId: string;
	handleMessageOpen: (id: string) => void;
	childList?: boolean;
	isOverallLast?: boolean;
}) {
	const permawebProvider = usePermawebProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const tableContainerRef = React.useRef(null);

	const [currentFilter, setCurrentFilter] = React.useState<MessageFilterType>('incoming');
	const [currentData, setCurrentData] = React.useState<GQLNodeResponseType[] | null>(null);
	const [loadingMessages, setLoadingMessages] = React.useState<boolean>(false);

	const [incomingCount, setIncomingCount] = React.useState<number | null>(null);
	const [outgoingCount, setOutgoingCount] = React.useState<number | null>(null);

	const [pageCursor, setPageCursor] = React.useState<string | null>(null);
	const [cursorHistory, setCursorHistory] = React.useState([]);
	const [nextCursor, setNextCursor] = React.useState<string | null>(null);
	const [pageNumber, setPageNumber] = React.useState(1);
	const [perPage, setPerPage] = React.useState(100);

	React.useEffect(() => {
		(async function () {
			try {
				const [gqlResponseIncoming, gqlResponseOutgoing] = await Promise.all([
					permawebProvider.libs.getGQLData({
						tags: [...DEFAULT_MESSAGE_TAGS],
						recipients: [props.txId],
					}),
					permawebProvider.libs.getGQLData({
						tags: [...DEFAULT_MESSAGE_TAGS, { name: 'From-Process', values: [props.txId] }],
						paginator: perPage,
					}),
				]);
				setIncomingCount(gqlResponseIncoming.count);
				setOutgoingCount(gqlResponseOutgoing.count);
			} catch (e: any) {
				console.error(e);
			}
		})();
	}, [props.txId]);

	// TODO: Result type
	React.useEffect(() => {
		(async function () {
			if (props.txId) {
				setLoadingMessages(true);
				try {
					if (!props.childList && props.type === 'process') {
						let gqlResponse: DefaultGQLResponseType;
						switch (currentFilter) {
							case 'incoming':
								gqlResponse = await permawebProvider.libs.getGQLData({
									tags: [...DEFAULT_MESSAGE_TAGS],
									recipients: [props.txId],
									paginator: perPage,
									...(pageCursor ? { cursor: pageCursor } : {}),
								});
								break;
							case 'outgoing':
								gqlResponse = await permawebProvider.libs.getGQLData({
									tags: [...DEFAULT_MESSAGE_TAGS, { name: 'From-Process', values: [props.txId] }],
									paginator: perPage,
									...(pageCursor ? { cursor: pageCursor } : {}),
								});
								break;
							default:
								break;
						}
						setCurrentData(gqlResponse.data);
						setNextCursor(gqlResponse.nextCursor);
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
	}, [props.txId, currentFilter, pageCursor, permawebProvider.libs]);

	// // Function to reset pagination when switching filters
	// function handleFilterChange(filter: MessageFilterType) {
	// 	setCurrentFilter(filter);
	// 	setPageCursor(null);
	// 	// Optionally clear cursors to avoid stale state:
	// 	setNextCursor(null);
	// 	setPrevCursor(null);
	// }

	const scrollToTop = () => {
		if (tableContainerRef.current) {
			setTimeout(() => {
				tableContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 10);
		}
	};

	function handleNext() {
		if (nextCursor) {
			setCursorHistory((prevHistory) => [...prevHistory, pageCursor]);
			setPageCursor(nextCursor);
			setPageNumber((prevPage) => prevPage + 1);
			scrollToTop();
		}
	}

	function handlePrevious() {
		if (cursorHistory.length > 0) {
			const newHistory = [...cursorHistory];
			const previousCursor = newHistory.pop();
			setCursorHistory(newHistory);
			setPageCursor(previousCursor);
			setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
		}
	}

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

	function getPaginator(showPages: boolean) {
		const totalCount = currentFilter === 'incoming' ? incomingCount : outgoingCount;
		const totalPages = totalCount ? Math.ceil(totalCount / perPage) : 1;
		return (
			<>
				<Button
					type={'alt3'}
					label={language.previous}
					handlePress={handlePrevious}
					disabled={cursorHistory.length === 0 || loadingMessages}
				/>
				{showPages && (
					<S.PageCounter>
						<p>{`Page (${formatCount(pageNumber.toString())} of ${formatCount(totalPages.toString())})`}</p>
						<S.Divider />
						<p>{`${perPage} per page`}</p>
						{/* <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
							<input
								type={'number'}
								value={perPage}
								min={'1'}
								onChange={(e) => {
									const newPerPage = parseInt(e.target.value, 10);
									if (!isNaN(newPerPage) && newPerPage > 0) {
										setPerPage(newPerPage);
										// Optionally reset pagination here if needed:
										// setPageCursor(null);
										// setCursorHistory([]);
										// setPageCount(1);
									}
								}}
							/>
							per page
						</label> */}
					</S.PageCounter>
				)}
				<Button
					type={'alt3'}
					label={language.next}
					handlePress={handleNext}
					disabled={!nextCursor || loadingMessages}
				/>
			</>
		);
	}

	return (
		<S.Container ref={tableContainerRef}>
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
						<S.Divider />
						<Button
							type={'alt3'}
							label={language.filter}
							handlePress={() => console.log('TODO')}
							active={false}
							disabled={true}
							icon={ASSETS.filter}
							iconLeftAlign
						/>
						<S.Divider />
						{getPaginator(false)}
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
					<S.BodyWrapper childList={props.childList} isOverallLast={props.isOverallLast}>
						{currentData.map((element: GQLNodeResponseType, index: number) => {
							const isLastChild = index === currentData.length - 1;

							return (
								<Message
									key={element.node.id}
									element={element}
									type={props.type}
									parentId={props.parentId}
									handleOpen={(id: string) => props.handleMessageOpen(id)}
									lastChild={isLastChild}
									isOverallLast={props.isOverallLast && isLastChild}
								/>
							);
						})}
					</S.BodyWrapper>
				</S.Wrapper>
			) : (
				getMessage()
			)}
			{!props.childList && <S.FooterWrapper>{getPaginator(true)}</S.FooterWrapper>}
		</S.Container>
	);
}
