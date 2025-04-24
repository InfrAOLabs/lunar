import React from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { DefaultGQLResponseType, GQLNodeResponseType } from '@permaweb/libs';
import { useTheme } from 'styled-components';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { Panel } from 'components/atoms/Panel';
import { TxAddress } from 'components/atoms/TxAddress';
import { JSONReader } from 'components/molecules/JSONReader';
import { ASSETS, DEFAULT_ACTIONS, DEFAULT_MESSAGE_TAGS, URLS } from 'helpers/config';
import { arweaveEndpoint } from 'helpers/endpoints';
import { MessageFilterType, TransactionType } from 'helpers/types';
import { formatCount, getRelativeDate, getTagValue } from 'helpers/utils';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { usePermawebProvider } from 'providers/PermawebProvider';
import { CloseHandler } from 'wrappers/CloseHandler';

import * as S from './styles';

function Message(props: {
	element: GQLNodeResponseType;
	type: TransactionType;
	currentFilter: MessageFilterType;
	parentId: string;
	handleOpen: (id: string) => void;
	lastChild?: boolean;
	isOverallLast?: boolean;
}) {
	const navigate = useNavigate();
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
				let processId: string = props.element.node.recipient;

				if (props.parentId) {
					switch (props.currentFilter) {
						case 'incoming':
							processId = props.parentId;
							break;
						case 'outgoing':
							processId = props.element.node.recipient;
							break;
					}
				}

				if (processId) {
					try {
						const messageResult = await permawebProvider.ao.result({
							process: processId,
							message: props.element.node.id,
						});
						setResult(messageResult);
					} catch (e: any) {
						console.error(e);
					}
				}
			}
		})();
	}, [result, showViewResult, props.currentFilter]);

	function handleShowViewResult(e: any) {
		e.preventDefault();
		e.stopPropagation();
		setShowViewResult((prev) => !prev);
	}

	function getAction() {
		return getTagValue(props.element.node.tags, 'Action') ?? language.none;
	}

	function getFrom() {
		const from = getTagValue(props.element.node.tags, 'From-Process');

		return (
			<S.From>
				<TxAddress address={from ?? props.element.node.owner.address} />
			</S.From>
		);
	}

	function getTo() {
		return (
			<S.To>
				<TxAddress address={props.element.node.recipient} />
			</S.To>
		);
	}

	function getActionBackground() {
		const action = getAction();
		switch (action) {
			case DEFAULT_ACTIONS.eval.name:
				return currentTheme.colors.actions.eval;
			case DEFAULT_ACTIONS.info.name:
				return currentTheme.colors.actions.info;
			case DEFAULT_ACTIONS.balance.name:
				return currentTheme.colors.actions.balance;
			case DEFAULT_ACTIONS.transfer.name:
				return currentTheme.colors.actions.transfer;
			case DEFAULT_ACTIONS.debitNotice.name:
				return currentTheme.colors.actions.debitNotice;
			case DEFAULT_ACTIONS.creditNotice.name:
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
						handlePress={() =>
							props.handleOpen
								? props.handleOpen(props.element.node.id)
								: navigate(`${URLS.explorer}${props.element.node.id}`)
						}
						dimensions={{
							wrapper: 22.5,
							icon: 12.5,
						}}
						tooltip={language.openInNewTab}
						tooltipPosition={'top-left'}
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
				{getFrom()}
				{getTo()}
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
					currentFilter={props.currentFilter}
					recipient={props.element.node.recipient}
					parentId={props.parentId}
					handleMessageOpen={props.handleOpen ? (id: string) => props.handleOpen(id) : null}
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

export default function MessageList(props: {
	txId?: string;
	type?: TransactionType;
	currentFilter?: MessageFilterType;
	recipient?: string | null;
	parentId?: string;
	handleMessageOpen?: (id: string) => void;
	childList?: boolean;
	isOverallLast?: boolean;
}) {
	const permawebProvider = usePermawebProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const tableContainerRef = React.useRef(null);

	const [currentFilter, setCurrentFilter] = React.useState<MessageFilterType>(props.currentFilter ?? 'incoming');
	const [currentAction, setCurrentAction] = React.useState<string | null>(null);
	const [actionOptions, setActionOptions] = React.useState<string[]>(
		Object.keys(DEFAULT_ACTIONS).map((action) => DEFAULT_ACTIONS[action].name)
	);
	const [customAction, setCustomAction] = React.useState<string>('');
	const [showFilterDropdown, setShowFilterDropdown] = React.useState<boolean>(false);
	const [currentData, setCurrentData] = React.useState<GQLNodeResponseType[] | null>(null);
	const [loadingMessages, setLoadingMessages] = React.useState<boolean>(false);

	const [incomingCount, setIncomingCount] = React.useState<number | null>(null);
	const [outgoingCount, setOutgoingCount] = React.useState<number | null>(null);
	const [totalCount, setTotalCount] = React.useState<number | null>(null);

	const [pageCursor, setPageCursor] = React.useState<string | null>(null);
	const [cursorHistory, setCursorHistory] = React.useState([]);
	const [nextCursor, setNextCursor] = React.useState<string | null>(null);
	const [pageNumber, setPageNumber] = React.useState(1);
	const [perPage, _setPerPage] = React.useState(100);

	React.useEffect(() => {
		(async function () {
			const tags = [...DEFAULT_MESSAGE_TAGS];
			if (currentAction) tags.push({ name: 'Action', values: [currentAction] });
			if (props.txId) {
				try {
					const [gqlResponseIncoming, gqlResponseOutgoing] = await Promise.all([
						permawebProvider.libs.getGQLData({
							tags: tags,
							recipients: [props.txId],
						}),
						permawebProvider.libs.getGQLData({
							tags: [...tags, { name: 'From-Process', values: [props.txId] }],
							paginator: perPage,
						}),
					]);
					setIncomingCount(gqlResponseIncoming.count);
					setOutgoingCount(gqlResponseOutgoing.count);
				} catch (e: any) {
					console.error(e);
				}
			}
		})();
	}, [props.txId, currentAction]);

	React.useEffect(() => {
		(async function () {
			const tags = [...DEFAULT_MESSAGE_TAGS];
			if (currentAction) tags.push({ name: 'Action', values: [currentAction] });
			
			setLoadingMessages(true);
			if (props.txId) {
				try {
					if (!props.childList && props.type === 'process') {
						let gqlResponse: DefaultGQLResponseType;
						switch (currentFilter) {
							case 'incoming':
								gqlResponse = await permawebProvider.libs.getGQLData({
									tags: tags,
									recipients: [props.txId],
									paginator: perPage,
									...(pageCursor ? { cursor: pageCursor } : {}),
								});
								break;
							case 'outgoing':
								gqlResponse = await permawebProvider.libs.getGQLData({
									tags: [...tags, { name: 'From-Process', values: [props.txId] }],
									paginator: perPage,
									...(pageCursor ? { cursor: pageCursor } : {}),
								});
								break;
							default:
								break;
						}
						setCurrentData(gqlResponse.data);
						setNextCursor(gqlResponse.data.length >= perPage ? gqlResponse.nextCursor : null);
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
			} else {
				const arweaveResponse = await fetch(arweaveEndpoint);
				const currentBlock = (await arweaveResponse.json()).height;

				const gqlResponse = await permawebProvider.libs.getGQLData({
					tags: tags,
					minBlock: currentBlock - 20,
					maxBlock: currentBlock,
					...(pageCursor ? { cursor: pageCursor } : {}),
				});

				setTotalCount(gqlResponse.count);
				setCurrentData(gqlResponse.data);
				setNextCursor(gqlResponse.data.length >= perPage ? gqlResponse.nextCursor : null);
			}
			setLoadingMessages(false);
		})();
	}, [props.txId, currentFilter, currentAction, pageCursor, permawebProvider.libs]);

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

	function handleClear() {
		setPageNumber(1);
		setPageCursor(null);
		setNextCursor(null);
		setCursorHistory([]);
	}

	function handleFilterChange(filter: MessageFilterType) {
		setCurrentFilter(filter);
		handleClear();
	}

	function handleActionChange(action: string) {
		setCurrentAction(currentAction === action ? null : action);
		setShowFilterDropdown(false);
		handleClear();
	}

	function handleActionAdd() {
		flushSync(() => {
			setActionOptions((prev) => [...prev, customAction]);
			handleActionChange(customAction);
			setCustomAction('');
		});
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
		const count = totalCount ? totalCount : currentFilter === 'incoming' ? incomingCount : outgoingCount;
		const totalPages = count ? Math.ceil(count / perPage) : 1;
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
					<S.HeaderMain>
						<p>{language.messages}</p>
						{loadingMessages && (
							<div className={'loader'}>
								<Loader xSm relative />
							</div>
						)}
					</S.HeaderMain>
					<S.HeaderActions>
						{props.type === 'process' && (
							<>
								<Button
									type={'alt3'}
									label={`${language.incoming}${incomingCount ? ` (${formatCount(incomingCount.toString())})` : ''}`}
									handlePress={() => handleFilterChange('incoming')}
									active={currentFilter === 'incoming'}
									disabled={loadingMessages}
								/>
								<Button
									type={'alt3'}
									label={`${language.outgoing}${outgoingCount ? ` (${formatCount(outgoingCount.toString())})` : ''}`}
									handlePress={() => handleFilterChange('outgoing')}
									active={currentFilter === 'outgoing'}
									disabled={loadingMessages}
								/>
								<S.Divider />
							</>
						)}
						{currentAction && (
								<Button
									type={'alt3'}
									label={currentAction}
									handlePress={() => handleActionChange(currentAction)}
									active={true}
									disabled={loadingMessages}
									icon={ASSETS.close}
								/>
							)}
						<S.FilterWrapper>
							<CloseHandler
								callback={() => {
									setShowFilterDropdown(false);
								}}
								active={showFilterDropdown}
								disabled={!showFilterDropdown}
							>
								<Button
									type={'alt3'}
									label={language.filter}
									handlePress={() => setShowFilterDropdown((prev) => !prev)}
									active={showFilterDropdown}
									disabled={loadingMessages}
									icon={ASSETS.filter}
									iconLeftAlign
								/>
								{showFilterDropdown && (
									<S.FilterDropdown className={'border-wrapper-alt1 fade-in scroll-wrapper'}>
										<S.FilterDropdownHeader>
											<p>{language.byAction}</p>
										</S.FilterDropdownHeader>
										<S.FilterDropdownActionSelect>
											{actionOptions.map((action) => {
												return (
													<Button
														key={action}
														type={'primary'}
														label={action}
														handlePress={() => handleActionChange(action)}
														disabled={loadingMessages}
														active={currentAction === action}
														height={35}
														fullWidth
													/>
												);
											})}
											<FormField
												label={language.customAction}
												value={customAction}
												onChange={(e: any) => setCustomAction(e.target.value)}
												disabled={loadingMessages}
												invalid={{ status: actionOptions.some((action) => action === customAction), message: null }}
												hideErrorMessage
											/>
											<Button
												type={'alt1'}
												label={language.submit}
												handlePress={() => handleActionAdd()}
												disabled={!customAction || actionOptions.some((action) => action === customAction) || loadingMessages}
												active={false}
												height={37.5}
												fullWidth
											/>
										</S.FilterDropdownActionSelect>
									</S.FilterDropdown>
								)}
							</CloseHandler>
						</S.FilterWrapper>
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
							<S.From>
								<p>{language.from}</p>
							</S.From>
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
									currentFilter={currentFilter}
									parentId={props.parentId}
									handleOpen={props.handleMessageOpen ? (id: string) => props.handleMessageOpen(id) : null}
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
