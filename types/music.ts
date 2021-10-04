export interface ITrack {
	name: string;
	artist: { mbid: string; '#text': string };
	url: string;
	image: { size: string; '#text': string }[];
	'@attr'?: { nowplaying: boolean };
	date?: { uts: string; '#text': string };
	mbid: string;
}
