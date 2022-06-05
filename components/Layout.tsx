import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { FC } from 'react';
import { MusicContextProvider, useMusicContext } from '../context/musicContext';

const Layout: FC = (props) => {
	const music = useMusicContext();

	const variants: Variants = {
		initial: {
			color: music.backgroundColor,
		},
		basic: {
			color: music.color,
			backgroundColor: music.backgroundColor,
			transition: { duration: 1 },
		},
		exit: { color: music.backgroundColor },
	};

	return (
		<motion.main
			animate="basic"
			initial="initial"
			exit="exit"
			variants={variants}
			style={{
				backgroundColor: music.backgroundColor,
				color: music.color,
			}}
			className="min-h-screen overflow-hidden p-4 flex flex-col gap-4 selection:bg-gray-900 selection:text-blue-400"
		>
			{props.children}
		</motion.main>
	);
};

export { Layout };
