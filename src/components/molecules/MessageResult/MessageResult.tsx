import React from 'react';

import { JSONTree } from 'components/atoms/JSONTree';
import { Loader } from 'components/atoms/Loader';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { usePermawebProvider } from 'providers/PermawebProvider';

import * as S from './styles';

export default function MessageResult(props: { processId: string; messageId: string }) {
	const permawebProvider = usePermawebProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [result, setResult] = React.useState<any>(null);

	React.useEffect(() => {
		(async function () {
			if (!result) {
				try {
					const messageResult = await permawebProvider.ao.result({
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

	return (
		<S.Wrapper>
			{result ? (
				<JSONTree data={result} header={language.result} />
			) : (
				<Loader sm relative />
			)}
		</S.Wrapper>
	)
}
