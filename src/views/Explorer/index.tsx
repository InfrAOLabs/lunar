import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { GQLNodeResponseType } from '@permaweb/libs';

import { ViewWrapper } from 'app/styles';
import { IconButton } from 'components/atoms/IconButton';
import { ViewHeader } from 'components/atoms/ViewHeader';
import { Transaction } from 'components/organisms/Transaction';
import { ASSETS, URLS } from 'helpers/config';
import { TransactionType } from 'helpers/types';
import { checkValidAddress, formatAddress, getTagValue } from 'helpers/utils';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

export default function Explorer() {
	const location = useLocation();
	const navigate = useNavigate();

	const tabsRef = React.useRef<HTMLDivElement>(null);

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [transactions, setTransactions] = React.useState<TransactionType[]>(() => {
		const stored = localStorage.getItem('transactions');
		return stored && JSON.parse(stored).length > 0 ? JSON.parse(stored) : [{ id: '', label: '', type: 'message' }];
	});
	const [activeTabIndex, setActiveTabIndex] = React.useState<number>(getInitialIndex());

	React.useEffect(() => {
		const el = tabsRef.current;
		if (!el) return;

		const onWheel = (e: WheelEvent) => {
			if (e.deltaY !== 0) {
				e.preventDefault();
				el.scrollLeft += e.deltaY;
			}
		};
		
		el.addEventListener('wheel', onWheel, { passive: false });

		return () => {
			el.removeEventListener('wheel', onWheel);
		};
	}, []);

	React.useEffect(() => {
		localStorage.setItem('transactions', JSON.stringify(transactions));
	}, [transactions]);

	function getInitialIndex() {
		if (transactions.length <= 0) return 0;
		const currentTxId = location.pathname.replace(`${URLS.explorer}/`, '');
		for (let i = 0; i < transactions.length; i++) {
			if (transactions[i].id === currentTxId) return i;
		}
		return 0;
	}

	const handleTxChange = (tabIndex: number, newTx: GQLNodeResponseType) => {
		const type = getTagValue(newTx.node.tags, 'Type');
		setTransactions((prev) => {
			const updated = [...prev];
			if (updated[tabIndex]) {
				updated[tabIndex] = {
					...updated[tabIndex],
					id: newTx.node.id,
					label: newTx.node.id,
					type: type ? (type.toLowerCase() as any) : 'message',
				};
			} else {
				updated.push({
					id: newTx.node.id,
					label: newTx.node.id,
					type: type ? (type.toLowerCase() as any) : 'message',
				});
			}
			return updated;
		});
		setActiveTabIndex(tabIndex);

		navigate(`${URLS.explorer}/${newTx.node.id}`);
	};

	const handleTabRedirect = (index: number) => {
		setActiveTabIndex(index);
		navigate(`${URLS.explorer}/${transactions[index].id}`);
	};

	const handleAddTab = () => {
		setTransactions((prev) => [...prev, { id: '', label: '', type: 'message' }]);
		setActiveTabIndex(transactions.length);
		navigate(URLS.explorer);
	};

	const handleDeleteTab = (deletedIndex: number) => {
		setTransactions((prevTransactions) => {
			const updatedTransactions = prevTransactions.filter((_, i) => i !== deletedIndex);

			setActiveTabIndex((_prevActiveIndex) => {
				if (deletedIndex === activeTabIndex) {
					return deletedIndex === 0 ? 0 : deletedIndex - 1;
				}

				if (deletedIndex < activeTabIndex) {
					return activeTabIndex - 1;
				}

				return activeTabIndex;
			});

			return updatedTransactions.length > 0 ? updatedTransactions : [{ id: '', label: '', type: 'message' }];
		});
	};

	const tabs = React.useMemo(() => {
		return (
			<S.TabsContent ref={tabsRef} className={'scroll-wrapper-hidden'}>
				{transactions.map((tx, index) => {
					let label = language.untitled;
					if (tx.label) {
						label = checkValidAddress(tx.label) ? formatAddress(tx.label, false) : tx.label;
					}
					return (
						<React.Fragment key={index}>
							<S.TabHeader>
								<S.TabAction active={index === activeTabIndex} onClick={() => handleTabRedirect(index)}>
									<div className={'icon-wrapper'}>
										<div className={'normal-icon'}>
											<ReactSVG src={ASSETS[tx.type]} />
										</div>
										<div className={'delete-icon'}>
											<IconButton
												type={'primary'}
												src={ASSETS.close}
												handlePress={() => {
													handleDeleteTab(index);
												}}
												dimensions={{ wrapper: 10, icon: 10 }}
											/>
										</div>
									</div>
									{label}
								</S.TabAction>
							</S.TabHeader>
							{index !== transactions.length - 1 && <S.TabDivider />}
						</React.Fragment>
					);
				})}
				<S.TabDivider />
				<S.TabAction active={false} onClick={handleAddTab}>
					<div className={'add-icon'}>
						<ReactSVG src={ASSETS.add} />
					</div>
					{language.new}
				</S.TabAction>
				<S.TabDivider />
			</S.TabsContent>
		);
	}, [transactions, activeTabIndex, language]);

	return (
		<S.Wrapper>
			<S.HeaderWrapper>
				<ViewHeader header={language.explorer} />
				<S.TabsWrapper>
					<ViewWrapper>{tabs}</ViewWrapper>
				</S.TabsWrapper>
			</S.HeaderWrapper>
			<ViewWrapper>
				{transactions.map((tx: TransactionType, index) => (
					<S.TransactionWrapper key={index} active={index === activeTabIndex}>
						<Transaction
							txId={tx.id}
							type={tx.type}
							active={index === activeTabIndex}
							onTxChange={(newTx: GQLNodeResponseType) => handleTxChange(index, newTx)}
						/>
					</S.TransactionWrapper>
				))}
			</ViewWrapper>
		</S.Wrapper>
	);
}
