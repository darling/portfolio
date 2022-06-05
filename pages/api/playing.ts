// next endpoint
import axios from 'axios';
import { loadImage } from 'canvas';
import { NextApiRequest, NextApiResponse } from 'next';
import { getColorsFromImage } from '../../util/medianAverageColor';
import { ITrack } from '../../util/swr';

let cachedResponse;
let lastTime;

const playing = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log('playing request');

	if (cachedResponse && Date.now() - lastTime < 10000) {
		return res.json(cachedResponse);
	}

	console.log('inserting new request');

	const data = (
		await axios.get(
			`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=safebell&api_key=${process.env.LASTFM_API}&format=json&limit=1`
		)
	).data;

	const firstImgSrc: string =
		data['recenttracks']['track'][0].image[3]['#text'] ||
		'https://via.placeholder.com/300';
	const img = await loadImage(firstImgSrc);
	const colors = getColorsFromImage(img);

	const lastTrack = data['recenttracks']['track'][0];

	const lastfmData: ITrack = {
		artist: [
			{
				name: lastTrack.artist['#text'] as string,
				url: '',
			},
		],
		image: lastTrack.image[3]['#text'] as string,
		album: {
			name: lastTrack.album['#text'] as string,
			url: '',
		},
		name: lastTrack.name as string,
		url: lastTrack.url as string,
		nowPlaying: lastTrack?.['@attr']?.nowplaying === 'true',
	};

	cachedResponse = {
		colors,
		data: lastfmData,
	};

	// set lastTime to current time
	lastTime = Date.now();

	return await res.json(cachedResponse);
};

export default playing;
