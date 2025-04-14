import React from 'react';

import { JSONReader } from 'components/molecules/JSONReader';
import { JSONWriter } from 'components/molecules/JSONWriter';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { usePermawebProvider } from 'providers/PermawebProvider';

import * as S from './styles';

export default function ProcessEditor(props: { processId: string; type: 'read' | 'write' }) {
	const permawebProvider = usePermawebProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [loading, setLoading] = React.useState<boolean>(false);
	const [output, setOutput] = React.useState<any>(null);

	async function handleSubmit(query: object) {
		setLoading(true);
		try {
			const response = await permawebProvider.ao.dryrun(query);
			setOutput(response);
		} catch (e: any) {
			console.error(e);
		}
		setLoading(false);
	}

	return (
		<S.Wrapper>
			<S.EditorWrapper>
				<JSONWriter
					initialData={{
						process: props.processId ?? '',
						data: '',
						tags: [
							{
								name: 'Action',
								value: 'Info',
							},
						],
					}}
					handleSubmit={handleSubmit}
					loading={loading}
				/>
			</S.EditorWrapper>
			<S.ResultWrapper>
				<JSONReader data={output} header={language.response} maxHeight={600} />
			</S.ResultWrapper>
		</S.Wrapper>
	);
}
