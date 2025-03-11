import React from 'react';

import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import { TxAddress } from 'components/atoms/TxAddress';
import { formatAddress, formatMs } from 'helpers/utils';
import { usePermawebProvider } from 'providers/PermawebProvider';

import * as S from './styles';

export default function ProcessRead(props: { processId }) {
	const permawebProvider = usePermawebProvider();

	const [cuLocation, setCuLocation] = React.useState(null);
	const [startTime, setStartTime] = React.useState(null);
	const [roundtripTime, setRoundtripTime] = React.useState(null);
	const [elapsed, setElapsed] = React.useState(0);
	const [isFetching, setIsFetching] = React.useState(false);
	const [toggleRead, setToggleRead] = React.useState(false);
	const [readLog, setReadLog] = React.useState([]);
	const [errorLog, setErrorLog] = React.useState([]);

	React.useEffect(() => {
		(async function () {
			try {
				const response = await fetch(`https://cu.ao-testnet.xyz/results/${props.processId}`, {
					method: 'GET',
				});

				const cu = new URL(response.url);
				setCuLocation(cu.host);
			} catch (e: any) {
				console.error(e);
			}
		})();
	}, [props.processId]);

	React.useEffect(() => {
		let frameId;
		const fetchData = async () => {
			try {
				setIsFetching(true);
				const start = Date.now();
				setStartTime(start);

				const tick = () => {
					setElapsed(Date.now() - start);
					frameId = requestAnimationFrame(tick);
				};

				tick();

				// const requests = Array.from({ length: 12 }, () =>
				// 	permawebProvider.libs.readProcess({
				// 		processId: props.processId,
				// 		action: 'Info',
				// 	})
				// );

				// // Wait for all 20 requests to complete.
				// const responses = await Promise.all(requests);
				// console.log('All responses:', responses);

				const response = await permawebProvider.libs.readProcess({
					processId: props.processId,
					action: 'Info',
				});

				const roundTrip = Date.now() - start;
				setRoundtripTime(roundTrip);
				cancelAnimationFrame(frameId);
				setIsFetching(false);

				setReadLog((prevLog) => [...prevLog, { startTime: start, roundtripTime: roundTrip }]);
			} catch (e) {
				console.error(e);
				cancelAnimationFrame(frameId);
				setIsFetching(false);
				setErrorLog((prevLog) => [...prevLog, { time: Date.now(), message: e.message || 'Unknown error' }]);
			}
		};

		fetchData();
		return () => cancelAnimationFrame(frameId);
	}, [props.processId, toggleRead]);

	return (
		<S.Wrapper className={'border-wrapper-primary'}>
			<S.Header>
				<S.HeaderMain>
					<p>{`${cuLocation ?? '-'}`}</p>
				</S.HeaderMain>
				<Button
					type={'alt3'}
					label={isFetching ? 'Running...' : 'Run'}
					disabled={isFetching}
					handlePress={() => setToggleRead((prev) => !prev)}
				/>
			</S.Header>
			<S.Body>
				<S.Section>
					<S.SectionHeader>
						<TxAddress address={props.processId} />
					</S.SectionHeader>
				</S.Section>
				<S.Section>
					<S.SectionHeader>
						<p>Current Run</p>
					</S.SectionHeader>
					<S.SectionBody>
						<S.Line>
							<span>{startTime ? `Start Time: ${new Date(startTime).toLocaleTimeString()}` : 'Starting...'}</span>
						</S.Line>
						<S.Line>
							<span>
								{isFetching
									? `Elapsed: ${formatMs(elapsed)}`
									: `Roundtrip Time: ${roundtripTime ? formatMs(roundtripTime) : '-'}`}
							</span>
						</S.Line>
					</S.SectionBody>
				</S.Section>
				{readLog.length > 0 && (
					<S.Section>
						<S.SectionHeader>
							<p>Read Log</p>
						</S.SectionHeader>
						<S.SectionBody>
							{readLog.length === 0 ? (
								<S.Line>
									<span>No reads yet</span>
								</S.Line>
							) : (
								readLog.map((log, index) => (
									<S.Line key={index}>
										<span>
											{`(${index + 1}) Started at ${new Date(
												log.startTime
											).toLocaleTimeString()}, Roundtrip Time (${formatMs(log.roundtripTime)})`}
										</span>
									</S.Line>
								))
							)}
						</S.SectionBody>
					</S.Section>
				)}
				{errorLog.length > 0 && (
					<S.Section>
						<S.SectionHeader>
							<p>Error Log</p>
						</S.SectionHeader>
						<S.SectionBody>
							{errorLog.length === 0 ? (
								<S.Line>
									<span>No errors</span>
								</S.Line>
							) : (
								errorLog.map((err, index) => (
									<S.Error key={index}>
										<span>{`Error ${index + 1} at ${new Date(err.time).toLocaleTimeString()}: ${err.message}`}</span>
									</S.Error>
								))
							)}
						</S.SectionBody>
					</S.Section>
				)}
			</S.Body>
			{isFetching && (
				<S.LoadingWrapper>
					<Loader xSm relative />
				</S.LoadingWrapper>
			)}
		</S.Wrapper>
	);
}
