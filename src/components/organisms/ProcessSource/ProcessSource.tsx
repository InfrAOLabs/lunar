import React from 'react';

import { Loader } from 'components/atoms/Loader';
import { Editor } from 'components/molecules/Editor';
import { getTxEndpoint } from 'helpers/endpoints';

import * as S from './styles';

export default function ProcessSource(props: { processId: string }) {
	const srcId = 'f-Xac27OGcSSQuw8__BSwAauc4vANST92fZX2j0UJn0';

	const editorRef = React.useRef(null);

	const [src, setSrc] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (editorRef.current) {
			setTimeout(() => {
				editorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 10);
		}
	}, []);

	React.useEffect(() => {
		(async function () {
			try {
				const srcFetch = await fetch(getTxEndpoint(srcId));
				setSrc(await srcFetch.text());
			} catch (e: any) {
				console.error(e);
			}
		})();
	}, []);

	return src ? (
		<S.Wrapper ref={editorRef}>
			<Editor initialData={src} language={'lua'} readOnly loading={!src} />
		</S.Wrapper>
	) : <Loader sm relative />;
}
