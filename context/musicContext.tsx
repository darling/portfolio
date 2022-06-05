import { first, isEqual, last, sortedUniq } from 'lodash';
import { createContext, FC, useContext, useState } from 'react';
import { getRandomColorSet } from '../util/colors';
import { ITrack, useCurrentlyPlaying } from '../util/swr';

export interface IMusicContext {
	enabled: boolean;
	toggleEnabled: () => void;
	currentlyPlaying: ITrack;
	backgroundColor: string;
	color: string;
	uniqueMiddleColors: string[];
}

const dummyTrack: ITrack = {
	artist: [{ name: 'Loading', url: '/' }],
	image: '',
	album: {
		name: 'Loading',
		url: '/',
	},
	name: 'Loading',
	url: '/',
	nowPlaying: false,
};

export const MusicContext = createContext<IMusicContext>({
	enabled: false,
	toggleEnabled: () => {},
	currentlyPlaying: dummyTrack,
	backgroundColor: '#030409',
	color: '#c97470',
	uniqueMiddleColors: [
		'#08080f',
		'#0f101a',
		'#1a151e',
		'#171824',
		'#241b26',
		'#2a222c',
		'#452227',
		'#332e3b',
		'#452c36',
		'#572a2d',
		'#782b2a',
		'#573a42',
		'#504756',
		'#b04739',
	],
});

// MusicContext Provider
export const MusicContextProvider: FC = ({ children }) => {
	const [enabled, setEnabled] = useState(false);
	const swc = useCurrentlyPlaying(enabled);

	const toggleEnabled = () => {
		setEnabled(!enabled);
	};

	let mainTrack: ITrack = swc?.song?.data || dummyTrack;
	let colors: string[] = swc?.song?.colors || [];

	let uniqColors = sortedUniq(colors);

	// The color might match the default values if there's no existing album art
	// We can compare them against the default art and replace the color if it matches
	const defaultLastFmColors = ['#ebebeb', '#f5f5f5', '#ffffff'];

	if (uniqColors.length <= 3 || isEqual(uniqColors, defaultLastFmColors)) {
		// Set uniqColors to an array of funky colors
		uniqColors = [
			'#08080f',
			'#0f101a',
			'#1a151e',
			'#171824',
			'#241b26',
			'#2a222c',
			'#452227',
			'#332e3b',
			'#452c36',
			'#572a2d',
			'#782b2a',
			'#573a42',
			'#504756',
			'#b04739',
		];
	}

	const initBackgroundColor = first(uniqColors);
	const textColor = last(uniqColors);

	// Get the color array without first and last color
	const uniqueMiddleColors = uniqColors.slice(1, -1);

	return (
		<MusicContext.Provider
			value={{
				enabled,
				toggleEnabled,
				currentlyPlaying: mainTrack,
				backgroundColor: initBackgroundColor,
				color: textColor,
				uniqueMiddleColors,
			}}
		>
			{children}
		</MusicContext.Provider>
	);
};

export const useMusicContext = () => {
	const context = useContext(MusicContext);

	return context;
};
