import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { GQLNodeResponseType } from '@permaweb/libs';
import { debounce } from 'lodash';

import { FormField } from 'components/atoms/FormField';
import { IconButton } from 'components/atoms/IconButton';
import { ASSETS, STYLING, URLS } from 'helpers/config';
import { checkValidAddress, formatAddress, getTagValue } from 'helpers/utils';
import { checkWindowCutoff } from 'helpers/window';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { usePermawebProvider } from 'providers/PermawebProvider';
import { WalletConnect } from 'wallet/WalletConnect';
import { CloseHandler } from 'wrappers/CloseHandler';

import * as S from './styles';

export default function Navigation(props: { open: boolean; toggle: () => void }) {
	const location = useLocation();

	const permawebProvider = usePermawebProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [_desktop, setDesktop] = React.useState(checkWindowCutoff(parseInt(STYLING.cutoffs.desktop)));

	const [searchOpen, setSearchOpen] = React.useState<boolean>(false);
	const [inputTxId, setInputTxId] = React.useState<string>('');
	const [txOutputOpen, setTxOutputOpen] = React.useState<boolean>(false);
	const [loadingTx, setLoadingTx] = React.useState<boolean>(false);
	const [txResponse, setTxResponse] = React.useState<GQLNodeResponseType | null>(null);

	const paths = React.useMemo(() => {
		return [
			{
				path: URLS.base,
				icon: ASSETS.app,
				label: language.home,
			},
			{
				path: URLS.explorer,
				icon: ASSETS.explorer,
				label: language.explorer,
			},
			{
				path: URLS.aos,
				icon: ASSETS.console,
				label: language.aos,
			},
		];
	}, []);

	function handleWindowResize() {
		if (checkWindowCutoff(parseInt(STYLING.cutoffs.desktop))) {
			setDesktop(true);
		} else {
			setDesktop(false);
		}
	}

	const debouncedResize = React.useCallback(debounce(handleWindowResize, 0), []);

	React.useEffect(() => {
		window.addEventListener('resize', debouncedResize);

		return () => {
			window.removeEventListener('resize', debouncedResize);
		};
	}, [debouncedResize]);

	React.useEffect(() => {
		(async function () {
			if (inputTxId && checkValidAddress(inputTxId)) {
				setTxOutputOpen(true);
				setLoadingTx(true);
				try {
					const response = await permawebProvider.libs.getGQLData({
						ids: [inputTxId],
						tags: [
							{ name: 'Data-Protocol', values: ['ao'] },
							{ name: 'Variant', values: ['ao.TN.1'] },
						],
					});
					const responseData = response?.data?.[0];
					setTxResponse(responseData ?? null);
				} catch (e: any) {
					console.error(e);
				}
				setLoadingTx(false);
			} else {
				setTxResponse(null);
				setTxOutputOpen(false);
			}
		})();
	}, [inputTxId]);

	// const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
	// 	e.preventDefault();
	// 	confirmNavigation(to);
	// 	if (!desktop) props.toggle();
	// };

	// const navigationToggle = React.useMemo(() => {
	// 	return (
	// 		<S.ToggleWrapper>
	// 			<IconButton
	// 				type={props.open ? 'primary' : 'alt1'}
	// 				src={ASSETS.navigation}
	// 				handlePress={props.toggle}
	// 				dimensions={{
	// 					wrapper: 36.5,
	// 					icon: 20,
	// 				}}
	// 				tooltip={props.open ? language.sidebarClose : language.sidebarOpen}
	// 				tooltipPosition={props.open ? 'right' : 'bottom-left'}
	// 			/>
	// 		</S.ToggleWrapper>
	// 	);
	// }, [props.open, desktop]);

	// const panel = React.useMemo(() => {
	// 	const content = (
	// 		<>
	// 			<S.PanelHeader>{navigationToggle}</S.PanelHeader>
	// 			<>
	// 				<S.PanelContent open={props.open} className={'fade-in scroll-wrapper'}>
	// 					{paths.map((element: { path: string; label: string; icon: string; target?: '_blank' }, index: number) => {
	// 						return (
	// 							<Link
	// 								key={index}
	// 								to={element.path}
	// 								target={element.target || ''}
	// 								onClick={(e) => handleNavigate(e, element.path)}
	// 							>
	// 								<ReactSVG src={element.icon} />
	// 								{element.label}
	// 							</Link>
	// 						);
	// 					})}
	// 				</S.PanelContent>
	// 			</>
	// 		</>
	// 	);

	// 	if (desktop) {
	// 		return (
	// 			<S.Panel open={props.open} className={'fade-in'}>
	// 				{content}
	// 			</S.Panel>
	// 		);
	// 	} else {
	// 		return (
	// 			<>
	// 				<S.Panel open={props.open} className={'fade-in'}>
	// 					<CloseHandler active={props.open} disabled={!props.open} callback={() => props.toggle()}>
	// 						{content}
	// 					</CloseHandler>
	// 				</S.Panel>
	// 				<S.PanelOverlay open={props.open} />
	// 			</>
	// 		);
	// 	}
	// }, [props.open, desktop]);

	const searchOutput = React.useMemo(() => {
		if (loadingTx) {
			return (
				<S.SearchOutputPlaceholder>
					<p>{`${language.loading}...`}</p>
				</S.SearchOutputPlaceholder>
			);
		}

		if (txResponse) {
			const name = getTagValue(txResponse.node.tags, 'Name');
			return (
				<S.SearchResult>
					<Link
						to={`${URLS.explorer}${txResponse.node.id}`}
						onClick={() => {
							setTxResponse(null);
							setInputTxId('');
							setTxOutputOpen(false);
							setSearchOpen(false);
						}}
					>
						{name ?? formatAddress(txResponse.node.id, false)}
						<ReactSVG src={ASSETS.go} />
					</Link>
				</S.SearchResult>
			);
		}

		if (checkValidAddress(inputTxId)) {
			return (
				<S.SearchOutputPlaceholder>
					<p>{language.txNotFound}</p>
				</S.SearchOutputPlaceholder>
			);
		}

		return null;
	}, [loadingTx, txResponse]);

	function getSearch() {
		return (
			<S.SearchWrapper>
				<S.SearchInputWrapper>
					<ReactSVG src={ASSETS.search} />
					<FormField
						value={inputTxId}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputTxId(e.target.value)}
						onFocus={() => setTxOutputOpen(true)}
						placeholder={language.processOrMessageId}
						invalid={{ status: inputTxId ? !checkValidAddress(inputTxId) : false, message: null }}
						disabled={loadingTx}
						hideErrorMessage
						sm
					/>
				</S.SearchInputWrapper>
				{txOutputOpen && checkValidAddress(inputTxId) && <S.SearchOutputWrapper>{searchOutput}</S.SearchOutputWrapper>}
			</S.SearchWrapper>
		);
	}

	return (
		<>
			{/* {panel} */}
			<S.Header navigationOpen={props.open} className={'fade-in'}>
				<S.Content>
					<S.C1Wrapper>
						<S.LogoWrapper>
							<Link to={URLS.base}>
								<ReactSVG src={ASSETS.logo} />
							</Link>
						</S.LogoWrapper>
						<S.DNavWrapper>
							{paths.map((element: { path: string; label: string; target?: '_blank' }, index: number) => {
								const active =
									element.path === URLS.base
										? location.pathname === URLS.base
										: location.pathname.startsWith(element.path);
								return (
									<S.DNavLink key={index} active={active}>
										<Link to={element.path} target={element.target || ''}>
											{element.label}
										</Link>
									</S.DNavLink>
								);
							})}
						</S.DNavWrapper>
					</S.C1Wrapper>
					<S.ActionsWrapper>
						<S.DSearchWrapper>
							<CloseHandler
								callback={() => {
									setTxOutputOpen(false);
								}}
								active={txOutputOpen}
								disabled={!txOutputOpen}
							>
								{getSearch()}
							</CloseHandler>
						</S.DSearchWrapper>
						<WalletConnect />
						<S.MSearchWrapper>
							<IconButton
								type={'alt1'}
								src={ASSETS.search}
								handlePress={() => setSearchOpen((prev) => !prev)}
								dimensions={{
									wrapper: 36.5,
									icon: 15.5,
								}}
							/>
							{searchOpen && (
								<S.MSearchContainer className={'border-wrapper-alt1'}>
								<S.MSearchHeader>
									<p>{language.search}</p>
								</S.MSearchHeader>
								{getSearch()}
							</S.MSearchContainer>
							)}
						</S.MSearchWrapper>
					</S.ActionsWrapper>
				</S.Content>
			</S.Header>
		</>
	);
}
