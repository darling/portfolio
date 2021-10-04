import { head } from 'lodash';
import React, { FC } from 'react';
import { ITrack } from '../../types/music';
import { Albums } from '../music/AlbumScroll';

export const MusicSection: FC<{ tracks: ITrack[] }> = ({ tracks }) => {
	const mostRecentTrack = head(tracks);

	return (
		<div className="min-h-screen bg-green-100 py-36 selection:bg-red-400 selection:text-blue-100">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-16 sm:text-3xl text-lg">
				<p>
					In his downtime,{' '}
					<span className="font-bold text-blue-400">Safe</span> is
					often listening to music or is working.
				</p>
				{mostRecentTrack['@attr']?.nowplaying ? (
					<p>
						In fact, he is listening to{' '}
						<span className="font-bold text-green-400">
							{mostRecentTrack.name}
						</span>{' '}
						by{' '}
						<span className="font-bold text-indigo-400">
							{mostRecentTrack.artist['#text']}
						</span>{' '}
						at this very moment.
					</p>
				) : (
					<p>(Right now he's probably working)</p>
				)}
				<p>
					He loves to share music, so make sure to{' '}
					<a
						className="font-bold text-pink-400"
						href="https://sptfy.com/carter"
					>
						Trade Playlists
					</a>{' '}
					with him.
				</p>{' '}
			</div>
			<Albums tracks={tracks} />
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-16 sm:text-3xl text-lg">
				<p>
					That's about it. He likes to make friends and meet new
					people, learn new things. Feel free to reach out anytime.
				</p>
			</div>
		</div>
	);
};
