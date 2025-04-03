import React from 'react';
import { ReactSVG } from 'react-svg';
import { DefaultGQLResponseType, GQLNodeResponseType } from '@permaweb/libs';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { TxAddress } from 'components/atoms/TxAddress';
import { URLTabs } from 'components/atoms/URLTabs';
import { ViewHeader } from 'components/atoms/ViewHeader';
import { MessageList } from 'components/molecules/MessageList';
import { ProcessRead } from 'components/molecules/ProcessRead';
import { ASSETS, STYLING, URLS } from 'helpers/config';
import { getTxEndpoint } from 'helpers/endpoints';
import { checkValidAddress, formatDate, getTagValue } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { usePermawebProvider } from 'providers/PermawebProvider';

import * as S from './styles';

export default function Transaction(props: {
	txId: string;
	type: 'process' | 'message';
	active: boolean;
	onTxChange?: (newTx: GQLNodeResponseType) => void;
}) {
	const arProvider = useArweaveProvider();
	const permawebProvider = usePermawebProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [inputTxId, setInputTxId] = React.useState<string>(props.txId);
	const [loadingTx, setLoadingTx] = React.useState<boolean>(false);
	const [txResponse, setTxResponse] = React.useState<GQLNodeResponseType | null>(null);
	const [hasFetched, setHasFetched] = React.useState<boolean>(false);

	const excludedTagNames = ['Type', 'Authority', 'Module', 'Scheduler'];
	const filteredTags =
		txResponse?.node?.tags?.filter((tag: { name: string }) => !excludedTagNames.includes(tag.name)) || [];

	React.useEffect(() => {
		setInputTxId(props.txId);
	}, [props.txId]);

	React.useEffect(() => {
		setHasFetched(false);
		setTxResponse(null);
	}, [inputTxId]);

	React.useEffect(() => {
		if (props.active && !hasFetched && inputTxId && checkValidAddress(inputTxId)) {
			(async () => {
				await handleSubmit();
				setHasFetched(true);
			})();
		}
	}, [props.active, hasFetched, inputTxId]);

	async function handleSubmit() {
		if (inputTxId && checkValidAddress(inputTxId)) {
			setLoadingTx(true);
			try {
				const response = await permawebProvider.libs.getGQLData({ ids: [inputTxId] });
				const responseData = response?.data?.[0];
				setTxResponse(responseData ?? null);
				if (props.onTxChange) {
					props.onTxChange(responseData);
				}
			} catch (e: any) {
				console.error(e);
			}
			setLoadingTx(false);
		}
	}

	const OverviewLine = ({ label, value, render }: { label: string; value: any; render?: (v: any) => JSX.Element }) => {
		const defaultRender = (v: any) => {
			if (typeof v === 'string' && checkValidAddress(v)) {
				return <TxAddress address={v} />;
			}
			return <p>{v}</p>;
		};

		const renderContent = render || defaultRender;

		return (
			<S.OverviewLine>
				<span>{label}</span>
				{value ? renderContent(value) : <p>-</p>}
			</S.OverviewLine>
		);
	};

	const TABS = React.useMemo(
		() => [
			// {
			// 	label: language.overview,
			// 	icon: ASSETS.overview,
			// 	disabled: false,
			// 	url: URLS.explorerInfo(inputTxId),
			// 	view: () => (
			// 		<S.InfoWrapper>
			// 			<S.ReadWrapper>
			// 				{props.type === 'process' && <ProcessRead processId={inputTxId} autoRun={true} />}
			// 			</S.ReadWrapper>
			// 			<S.TagsWrapper>
			// 				<S.TagsSection className={'border-wrapper-primary'}>
			// 					<S.SectionHeader>
			// 						<p>{language.tags}</p>
			// 					</S.SectionHeader>
			// 					<S.OverviewWrapper>
			// 						<OverviewLine
			// 							label={language.type}
			// 							value={txResponse?.node?.tags && getTagValue(txResponse.node.tags, 'Type')}
			// 						/>
			// 						<OverviewLine
			// 							label={language.dateCreated}
			// 							value={
			// 								txResponse?.node?.block?.timestamp &&
			// 								formatDate(txResponse.node.block.timestamp * 1000, 'timestamp')
			// 							}
			// 						/>
			// 						<OverviewLine label={language.owner} value={txResponse?.node?.owner?.address} />
			// 						<S.OverviewDivider />
			// 						<OverviewLine
			// 							label={'Authority'}
			// 							value={txResponse?.node?.tags && getTagValue(txResponse.node.tags, 'Authority')}
			// 						/>
			// 						<OverviewLine
			// 							label={'Module'}
			// 							value={txResponse?.node?.tags && getTagValue(txResponse.node.tags, 'Module')}
			// 						/>
			// 						<OverviewLine
			// 							label={'Scheduler'}
			// 							value={txResponse?.node?.tags && getTagValue(txResponse.node.tags, 'Scheduler')}
			// 						/>
			// 						{txResponse ? (
			// 							<>
			// 								{filteredTags.map((tag: { name: string; value: string }, index: number) => (
			// 									<OverviewLine key={index} label={tag.name} value={tag.value} />
			// 								))}
			// 							</>
			// 						) : (
			// 							<S.OverviewLine>
			// 								<span>{language.processOrMessageTagsInfo}</span>
			// 							</S.OverviewLine>
			// 						)}
			// 					</S.OverviewWrapper>
			// 				</S.TagsSection>
			// 			</S.TagsWrapper>
			// 		</S.InfoWrapper>
			// 	),
			// },
			{
				label: language.messages,
				icon: ASSETS.message,
				disabled: false,
				url: URLS.explorerMessages(inputTxId),
				view: () => (
					<S.MessagesWrapper>
						<S.MessagesSection>
							{inputTxId && checkValidAddress(inputTxId) && (
								<MessageList txId={inputTxId} recipient={null} parentId={inputTxId} />
							)}
						</S.MessagesSection>
					</S.MessagesWrapper>
				),
			},
			{
				label: language.read,
				icon: ASSETS.read,
				disabled: false,
				url: URLS.explorerRead(inputTxId),
				view: () => (
					<p>Read</p>
				),
			},
			{
				label: language.write,
				icon: ASSETS.write,
				disabled: false,
				url: URLS.explorerWrite(inputTxId),
				view: () => (
					<p>Write</p>
				),
			},
		],
		[inputTxId, txResponse, language]
	);

	const transactionTabs = React.useMemo(() => {
		return <URLTabs tabs={TABS} activeUrl={TABS[0].url} />;
	}, [TABS]);

	function getTransaction() {
		if (!inputTxId || !txResponse) {
			return (
				<S.Placeholder>
					<S.PlaceholderIcon>
						<ReactSVG src={ASSETS.process} />
					</S.PlaceholderIcon>
					<S.PlaceholderDescription>
						<p>{loadingTx ? `Loading...` : `Enter a Process or Message ID`}</p>
					</S.PlaceholderDescription>
				</S.Placeholder>
			);
		}

		return transactionTabs;
	}

	return props.active ? (
		<S.Wrapper>
			<S.HeaderWrapper>
				<S.SearchWrapper>
					<S.SearchInputWrapper>
						<ReactSVG src={ASSETS.search} />
						<FormField
							value={inputTxId}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputTxId(e.target.value)}
							placeholder={language.processOrMessageId}
							invalid={{ status: false, message: null }}
							disabled={loadingTx}
							autoFocus
							hideErrorMessage
							sm
						/>
					</S.SearchInputWrapper>
					<IconButton
						type={'alt1'}
						src={ASSETS.copy}
						handlePress={() => {}}
						dimensions={{
							wrapper: 32.5,
							icon: 17.5
						}}
						tooltip={'Copy ID'}
					/>
				</S.SearchWrapper>
				<S.HeaderActionsWrapper>
					<Button
						type={'primary'}
						label={'Copy Full URL'}
						handlePress={() => {}}
					/>
				</S.HeaderActionsWrapper>
			</S.HeaderWrapper>
			<S.BodyWrapper>{getTransaction()}</S.BodyWrapper>
		</S.Wrapper>
	) : null;
}
