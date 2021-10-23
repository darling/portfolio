import axios from 'axios';
import { differenceInSeconds } from 'date-fns';
import { GetServerSideProps } from 'next';
import React from 'react';

import { MusicSection } from '../components/home/MusicSection';
import { Layout } from '../components/Layout';
import { ProjectList } from '../components/portfolio/ProjectList';
import { ITrack } from '../types/music';

export default function Home(props: { lastfm: ITrack[] }) {
	const tracks = props.lastfm;

	return (
		<Layout>
			<div className="max-w-4xl min-h-full mx-auto px-4 sm:px-6 lg:px-8 py-36 flex flex-col gap-8 md:gap-16 sm:text-3xl text-lg">
				<h1 className="text-4xl sm:text-7xl font-bold">
					<span className="transition duration-100 hover:text-red-400 text-red-400 md:text-gray-800">
						Safe
					</span>{' '}
					is a{' '}
					<span className="transition duration-100 hover:text-green-400 text-green-400 md:text-gray-800">
						Developer
					</span>{' '}
					trying to figure out what he wants to do with his time.
				</h1>
				<p>
					In the meantime, however, he is building cool projects by
					using new technologies.
				</p>

				<p>
					Perhaps you could get in contact with him through{' '}
					<a
						href="https://github.com/darling"
						className="hover:text-red-400 font-bold transition duration-200 text-indigo-400 md:text-gray-800"
					>
						Github
					</a>{' '}
					or{' '}
					<a
						href="mailto:c@ey.lc"
						className="hover:text-red-400 font-bold transition duration-200 text-pink-400 md:text-gray-800"
					>
						Email
					</a>
					. There's a good chance that you know him through{' '}
					<span className="font-bold text-indigo-400 md:text-gray-800 md:font-normal">
						Discord
					</span>{' '}
					or related already though, so feel free to contact him there
					if you have it.
				</p>
			</div>
			<div className="bg-pink-100 py-36 selection:bg-purple-400 selection:text-blue-100">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-16 sm:text-3xl text-lg">
					<ProjectList />
				</div>
			</div>
			<MusicSection tracks={tracks} />
		</Layout>
	);
}

let lastChecked: Date | undefined = undefined;
let data: any;

export const getServerSideProps: GetServerSideProps = async () => {
	if (
		!lastChecked ||
		Math.abs(differenceInSeconds(new Date(), lastChecked)) > 10
	) {
		console.log('Fetching');

		data = (
			await axios.get(
				`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=safebell&api_key=${process.env.LASTFM_API}&format=json`
			)
		).data;

		lastChecked = new Date();
	}

	return {
		props: {
			lastfm: data['recenttracks']['track'],
		},
	};
};
