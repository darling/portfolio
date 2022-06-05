// next endpoint
import axios from 'axios';
import { loadImage } from 'canvas';
import { map } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import { getColorsFromImage } from '../../util/medianAverageColor';
import { ITrack } from '../../util/swr';

let cachedResponse;
let lastTime;

const spotify = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log('serving spotify request');

	if (cachedResponse && Date.now() - lastTime < 10000) {
		return res.json(cachedResponse);
	}

	console.log('inserting new request');

	const data = (
		await axios.get(
			`https://api.spotify.com/v1/me/player/currently-playing`,
			{
				headers: {
					Authorization: `Bearer BQA6VFNvhcewIK8WsemF-fUWaI3CRwvmBpidIaIL--x157RDvEI1DHy05acXzarsPDEGmfp1UhmU7wTIIEC9xtAK9MWaq2XGAUxxvlxHgFT8_YSCI9jVtugJw9e3BexgazK5op0uIfo_jF90fwjla4rbcGCR21_tuTVyZHoNACoOtFYgSm2hDckWn7elxyCo3yPRjoSB9UnkAtxd0sHfWISiNnAwzD9Ac5nItcx4cqJk-euOi9-ixaPBsyF5Wa0ss3apPPa9ZNefzWC84EunC3ExF4chxTm7xmed`,
				},
			}
		)
	).data;

	const firstImgSrc: string = data.item.album.images[0].url;
	const img = await loadImage(firstImgSrc);
	const colors = getColorsFromImage(img);

	const spotifyData: ITrack = {
		artist: map(data.item.artists, (artist) => ({
			name: artist.name,
			url: artist.href,
		})),
		image: data.item.album.images[0].url,
		album: {
			name: data.item.album.name,
			url: data.item.album.href,
		},
		name: data.item.name,
		url: data.item.href,
		nowPlaying: true,
	};

	cachedResponse = { data: spotifyData, colors };
	lastTime = Date.now();

	res.json(cachedResponse);
};

export default spotify;
