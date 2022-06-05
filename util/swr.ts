import axios from 'axios';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';

export const swrFetcher = (url: string) => {
	return axios.get(url).then((res) => res.data);
};

export interface ITrack {
	artist: { name: string; url: string }[];
	image: string;
	album: {
		name: string;
		url: string;
	};
	name: string;
	url: string;
	nowPlaying: boolean;
}

export const useCurrentlyPlaying = (enabled: boolean) => {
	const { data, error } = useSWR<{ data: ITrack; colors: string[] }>(
		enabled ? '/api/playing' : null,
		swrFetcher,
		{
			refreshInterval: 1000,
		}
	);

	return {
		song: data,
		isLoading: !data && !error,
		isError: error,
	};
};
