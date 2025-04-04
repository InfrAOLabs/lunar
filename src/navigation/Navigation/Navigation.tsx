import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { debounce } from 'lodash';

import { FormField } from 'components/atoms/FormField';
import { IconButton } from 'components/atoms/IconButton';
import { ASSETS, STYLING, URLS } from 'helpers/config';
import { checkValidAddress } from 'helpers/utils';
import { checkWindowCutoff } from 'helpers/window';
import { useNavigationConfirm } from 'hooks/useNavigationConfirm';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { WalletConnect } from 'wallet/WalletConnect';
import { CloseHandler } from 'wrappers/CloseHandler';

import * as S from './styles';

// TODO: Remove confirm nav
export default function Navigation(props: { open: boolean; toggle: () => void }) {
	/* Confirm navigation from inside the post editor */
	const { confirmNavigation } = useNavigationConfirm('post', 'Changes you made may not be saved.');

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [desktop, setDesktop] = React.useState(checkWindowCutoff(parseInt(STYLING.cutoffs.desktop)));
	const [inputTxId, setInputTxId] = React.useState<string>('');
	const [loadingTx, setLoadingTx] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (checkValidAddress(inputTxId)) {
			// confirmNavigation(`${URLS.explorer}/${inputTxId}`); // TODO
		}
	}, [inputTxId]);

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
				path: URLS.console,
				icon: ASSETS.console,
				label: language.console,
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

	const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
		e.preventDefault();
		confirmNavigation(to);
		if (!desktop) props.toggle();
	};

	const navigationToggle = React.useMemo(() => {
		return (
			<S.ToggleWrapper>
				<IconButton
					type={props.open ? 'primary' : 'alt1'}
					src={ASSETS.navigation}
					handlePress={props.toggle}
					dimensions={{
						wrapper: 36.5,
						icon: 20,
					}}
					tooltip={props.open ? language.sidebarClose : language.sidebarOpen}
					tooltipPosition={props.open ? 'right' : 'bottom-left'}
				/>
			</S.ToggleWrapper>
		);
	}, [props.open, desktop]);

	const panel = React.useMemo(() => {
		const content = (
			<>
				<S.PanelHeader>{navigationToggle}</S.PanelHeader>
				<>
					<S.PanelContent open={props.open} className={'fade-in scroll-wrapper'}>
						{paths.map((element: { path: string; label: string; icon: string; target?: '_blank' }, index: number) => {
							return (
								<Link
									key={index}
									to={element.path}
									target={element.target || ''}
									onClick={(e) => handleNavigate(e, element.path)}
								>
									<ReactSVG src={element.icon} />
									{element.label}
								</Link>
							);
						})}
					</S.PanelContent>
				</>
			</>
		);

		if (desktop) {
			return (
				<S.Panel open={props.open} className={'fade-in'}>
					{content}
				</S.Panel>
			);
		} else {
			return (
				<>
					<S.Panel open={props.open} className={'fade-in'}>
						<CloseHandler active={props.open} disabled={!props.open} callback={() => props.toggle()}>
							{content}
						</CloseHandler>
					</S.Panel>
					<S.PanelOverlay open={props.open} />
				</>
			);
		}
	}, [props.open, desktop]);

	return (
		<>
			{panel}
			<S.Header navigationOpen={props.open} className={'fade-in'}>
				<S.Content>
					<S.C1Wrapper>
						{!props.open && navigationToggle}
						<S.SearchWrapper>
							<ReactSVG src={ASSETS.search} />
							<FormField
								value={inputTxId}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputTxId(e.target.value)}
								placeholder={language.processOrMessageId}
								invalid={{ status: false, message: null }}
								disabled={loadingTx}
								hideErrorMessage
								sm
							/>
						</S.SearchWrapper>
					</S.C1Wrapper>
					<S.ActionsWrapper>
						<WalletConnect />
					</S.ActionsWrapper>
				</S.Content>
			</S.Header>
		</>
	);
}
