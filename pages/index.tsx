import { random } from 'lodash';
import Link from 'next/link';
import React, { useState } from 'react';

import { Layout } from '../components/Layout';
import { useMusicContext } from '../context/musicContext';

import { motion, Variants } from 'framer-motion';

const links = [
	{
		href: '/about',
		title: 'About',
	},
	{
		href: '/portfolio',
		title: 'Previous Work',
	},
	// {
	// 	href: '/contact',
	// 	title: 'Contact',
	// },
];

export default function Home() {
	const music = useMusicContext();
	const [updateState, setUpdateState] = useState(0);

	return (
		<Layout>
			{music.uniqueMiddleColors.map((color, i) => {
				const left = random(50, 80);

				const variants: Variants = {
					initial: {
						opacity: 0,
						top: '100%',
						left: `${left}%`,
						backgroundColor: music.backgroundColor,
					},
					exit: {
						opacity: 0,
						top: '100%',
						left: `${left}%`,
						transition: { delay: i * 0.01, ease: 'easeIn' },
						backgroundColor: music.backgroundColor,
					},
				};

				return (
					<motion.div
						animate={{
							opacity: 1,
							transition: { delay: i * 0.1 },
							top: `${random(0, 90)}%`,
							left: `${left}%`,
							width: `${random(5, 20)}%`,
							height: `${random(5, 20)}%`,
							backgroundColor: color,
						}}
						initial="initial"
						exit="exit"
						style={{
							zIndex: i,
						}}
						variants={variants}
						className="fixed h-44 w-44 rounded-full hidden lg:block"
						key={i}
						onClick={() => {
							// redraw this component
							setUpdateState(updateState + 1);
						}}
					/>
				);
			})}
			<div
				style={{ zIndex: 1 }}
				className="flex-none flex flex-col gap-4"
			>
				<h1 className="text-7xl font-bold">Carter Black</h1>
				<div className="flex flex-row">
					{music.uniqueMiddleColors.map((color, i) => {
						const variants: Variants = {
							initial: {
								opacity: 0,
								backgroundColor: music.backgroundColor,
							},
							exit: {
								opacity: 0,
								backgroundColor: music.backgroundColor,
							},
						};

						return (
							<motion.div
								key={i}
								animate={{
									opacity: 1,
									backgroundColor: color,
									transition: { delay: i * 0.07 },
								}}
								initial="initial"
								exit="exit"
								variants={variants}
								className="h-8 w-8"
							/>
						);
					})}
				</div>
			</div>
			<div
				style={{ zIndex: 1 }}
				className="flex-none flex flex-col gap-4"
			>
				{links.map((link) => (
					<Link href={link.href} key={link.title}>
						<a className="text-2xl font-bold">{link.title}</a>
					</Link>
				))}
				<button
					onClick={() => {
						music.toggleEnabled();
					}}
					className="text-left"
				>
					<a className=" text-2xl font-bold">
						{!music.enabled
							? "Wanna see what I'm listening to?"
							: 'Disable Music Theme'}
					</a>
				</button>
			</div>
			<div className="flex-grow"></div>
			<motion.div
				animate={{
					opacity: music.enabled ? 1 : 0,
				}}
				className="gap-4 flex flex-row h-24 lg:h-56 relative"
				key={music.currentlyPlaying.name}
			>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
					}}
					exit={{
						opacity: 0,
					}}
					className="w-24 lg:w-56 rounded-xl overflow-hidden"
				>
					<img
						src={music.currentlyPlaying.image}
						className="max-w-full h-auto"
					/>
				</motion.div>
				<div className="flex flex-col justify-start">
					<p>Carter is listening to:</p>
					<h2 className="font-bold">
						<a href={music.currentlyPlaying.url}>
							{music.currentlyPlaying.name}
						</a>
					</h2>
					by{' '}
					{music.currentlyPlaying.artist
						.map((artist) => artist.name)
						.join(', ')}
					<h2></h2>
				</div>
			</motion.div>
		</Layout>
	);
}
