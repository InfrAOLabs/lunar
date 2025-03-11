import React from 'react';
import { ReactSVG } from 'react-svg';

import { GQLNodeResponseType } from '@permaweb/libs';

import { IconButton } from 'components/atoms/IconButton';
import { ViewHeader } from 'components/atoms/ViewHeader';
import { Transaction } from 'components/organisms/Transaction';
import { ASSETS } from 'helpers/config';
import { TransactionType } from 'helpers/types';
import { checkValidAddress, formatAddress, getTagValue } from 'helpers/utils';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

export default function Explorer() {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [transactions, setTransactions] = React.useState<TransactionType[]>(() => {
		const stored = localStorage.getItem('transactions');
		return stored && JSON.parse(stored).length > 0 ? JSON.parse(stored) : [{ id: '', label: '', type: 'message' }];
	});

	const [activeTabIndex, setActiveTabIndex] = React.useState<number>(0);

	React.useEffect(() => {
		localStorage.setItem('transactions', JSON.stringify(transactions));
	}, [transactions]);

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
	};

	const handleDeleteTab = (index: number) => {
		setTransactions((prev) => {
			const updated = prev.filter((_, i) => i !== index);
			return updated.length > 0 ? updated : [{ id: '', label: '', type: 'message' }];
		});
		setActiveTabIndex((prevIndex) => {
			if (prevIndex === index) {
				return index === 0 ? 0 : index - 1;
			} else if (prevIndex > index) {
				return prevIndex - 1;
			}
			return prevIndex;
		});
	};

	const tabs = React.useMemo(() => {
		return (
			<S.TabsHeaderWrapper>
				{transactions.map((tx, index) => {
					let label = language.untitled;
					if (tx.label) {
						label = checkValidAddress(tx.label) ? formatAddress(tx.label, false) : tx.label;
					}
					return (
						<React.Fragment key={index}>
							<S.TabHeader>
								<S.TabAction active={index === activeTabIndex} onClick={() => setActiveTabIndex(index)}>
									<ReactSVG src={ASSETS[tx.type]} />
									{label}
									<S.DeleteAction>
										<IconButton
											type={'primary'}
											src={ASSETS.close}
											handlePress={() => handleDeleteTab(index)}
											dimensions={{
												wrapper: 10,
												icon: 10,
											}}
										/>
									</S.DeleteAction>
								</S.TabAction>
							</S.TabHeader>
							{index !== transactions.length - 1 && <S.TabDivider />}
						</React.Fragment>
					);
				})}
				<S.TabDivider />
				<S.TabAction
					active={false}
					onClick={() => {
						setTransactions((prev) => [...prev, { id: '', label: '', type: 'message' }]);
						setActiveTabIndex(transactions.length);
					}}
				>
					<ReactSVG src={ASSETS.add} />
					{language.new}
				</S.TabAction>
			</S.TabsHeaderWrapper>
		);
	}, [transactions, activeTabIndex, language]);

	return (
		<S.Wrapper>
			<ViewHeader header={language.explorer} />
			<S.HeaderWrapper>{tabs}</S.HeaderWrapper>
			<S.BodyWrapper>
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
			</S.BodyWrapper>
		</S.Wrapper>
	);
}
