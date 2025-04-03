import React from 'react';
import PermawebLibs, { ProfileType } from '@permaweb/libs';

import Arweave from 'arweave';
import { connect, createDataItemSigner } from '@permaweb/aoconnect';

import { Panel } from 'components/atoms/Panel';
import { ProfileManager } from 'components/organisms/ProfileManager';
import { STORAGE } from 'helpers/config';

import { useArweaveProvider } from './ArweaveProvider';
import { useLanguageProvider } from './LanguageProvider';

interface PermawebContextState {
	ao: any;
	libs: any;
	profile: ProfileType;
	showProfileManager: boolean;
	setShowProfileManager: (toggle: boolean) => void;
	refreshProfile: () => void;
}

const DEFAULT_CONTEXT = {
	ao: null,
	libs: null,
	profile: null,
	showProfileManager: false,
	setShowProfileManager(_toggle: boolean) {},
	refreshProfile() {},
};

const PermawebContext = React.createContext<PermawebContextState>(DEFAULT_CONTEXT);

export function usePermawebProvider(): PermawebContextState {
	return React.useContext(PermawebContext);
}

// TODO: Reset profile on arProvider.wallet change / disconnect
export function PermawebProvider(props: { children: React.ReactNode }) {
	const arProvider = useArweaveProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [libs, setLibs] = React.useState<any>(null);
	const [ao, setAo] = React.useState<any>(null);

	const [profile, setProfile] = React.useState<ProfileType | null>(null);
	const [showProfileManager, setShowProfileManager] = React.useState<boolean>(false);
	const [refreshProfileTrigger, setRefreshProfileTrigger] = React.useState<boolean>(false);

	React.useEffect(() => {
		const ao = connect({ MODE: 'legacy' });
		const arweave = Arweave.init({});
		const signer = arProvider.wallet ? createDataItemSigner(arProvider.wallet) : null;
		
		setAo(ao);
		setLibs(PermawebLibs.init({ ao, arweave, signer }));
	}, [arProvider.wallet]);

	// React.useEffect(() => {
	// 	(async function () {
	// 		if (arProvider.wallet && arProvider.walletAddress) {
	// 			const cachedProfile = getCachedProfile(arProvider.walletAddress);
	// 			if (cachedProfile) {
	// 				setProfile(cachedProfile);
	// 			}

	// 			try {
	// 				const fetchedProfile = await libs.getProfileByWalletAddress(arProvider.walletAddress);
	// 				setProfile(fetchedProfile);
	// 				cacheProfile(arProvider.walletAddress, fetchedProfile);
	// 			} catch (e: any) {
	// 				console.error(e);
	// 			}
	// 		}
	// 	})();
	// }, [arProvider.wallet, arProvider.walletAddress, libs]);

	// React.useEffect(() => {
	// 	(async function () {
	// 		if (arProvider.wallet && arProvider.walletAddress) {
	// 			const fetchProfileUntilChange = async () => {
	// 				let changeDetected = false;
	// 				let tries = 0;
	// 				const maxTries = 10;

	// 				while (!changeDetected && tries < maxTries) {
	// 					try {
	// 						const existingProfile = profile;
	// 						const newProfile = await libs.getProfileByWalletAddress(arProvider.walletAddress);

	// 						if (JSON.stringify(existingProfile) !== JSON.stringify(newProfile)) {
	// 							setProfile(newProfile);
	// 							cacheProfile(arProvider.walletAddress, newProfile);
	// 							changeDetected = true;
	// 						} else {
	// 							await new Promise((resolve) => setTimeout(resolve, 1000));
	// 							tries++;
	// 						}
	// 					} catch (error) {
	// 						console.error(error);
	// 						break;
	// 					}
	// 				}

	// 				if (!changeDetected) {
	// 					console.warn(`No changes detected after ${maxTries} attempts`);
	// 				}
	// 			};

	// 			await fetchProfileUntilChange();
	// 		}
	// 	})();
	// }, [refreshProfileTrigger, libs]);

	// function getCachedProfile(address: string) {
	// 	const cached = localStorage.getItem(STORAGE.profile(address));
	// 	return cached ? JSON.parse(cached) : null;
	// }

	// function cacheProfile(address: string, profileData: any) {
	// 	localStorage.setItem(STORAGE.profile(address), JSON.stringify(profileData));
	// }

	return (
		<PermawebContext.Provider
			value={{
				ao: ao,
				libs: libs,
				profile: profile,
				showProfileManager,
				setShowProfileManager,
				refreshProfile: () => setRefreshProfileTrigger((prev) => !prev),
			}}
		>
			{props.children}
			<Panel
				open={showProfileManager}
				header={profile && profile.id ? language.editProfile : `${language.createProfile}!`}
				handleClose={() => setShowProfileManager(false)}
				width={575}
				closeHandlerDisabled
			>
				<ProfileManager
					profile={profile && profile.id ? profile : null}
					handleClose={() => setShowProfileManager(false)}
					handleUpdate={null}
				/>
			</Panel>
		</PermawebContext.Provider>
	);
}
