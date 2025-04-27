import React from 'react';

import { Loader } from 'components/atoms/Loader';
import { JSONReader } from 'components/molecules/JSONReader';
import { getTxEndpoint } from 'helpers/endpoints';
import { checkValidAddress } from 'helpers/utils';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { usePermawebProvider } from 'providers/PermawebProvider';

import * as S from './styles';

export default function MessageResult(props: { processId: string; messageId: string }) {
	const permawebProvider = usePermawebProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [data, setData] = React.useState<any>(null);
	const [result, setResult] = React.useState<any>(null);

	React.useEffect(() => {
		(async function () {
			if (!result && checkValidAddress(props.processId) && checkValidAddress(props.messageId)) {
				try {
					const messageFetch = await fetch(getTxEndpoint(props.messageId));
					const rawMessage = await messageFetch.text();
					
					try {
						setData(JSON.parse(rawMessage));
					}
					catch {}

					const messageResult = await permawebProvider.deps.ao.result({
						process: props.processId,
						message: props.messageId,
					});
					setResult(messageResult);
				} catch (e: any) {
					console.error(e);
				}
			}
		})();
	}, [result]);

	console.log(data)

	return (
		<S.Wrapper>
			{result ? (
				<>
				{data && typeof(data) === 'object' && <JSONReader data={data} header={language.data} maxHeight={600} />}
				<JSONReader data={result} header={language.result} maxHeight={600} />
				</>
			) : (
				<Loader sm relative />
			)}
		</S.Wrapper>
	)
}
