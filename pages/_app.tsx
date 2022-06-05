import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { MusicContextProvider, useMusicContext } from '../context/musicContext';
import '../styles/main.css';

function MyApp({ Component, pageProps, router }) {
	return (
		<MusicContextProvider>
			<AnimatePresence exitBeforeEnter>
				<Component {...pageProps} key={router.route} />
			</AnimatePresence>
		</MusicContextProvider>
	);
}

export default MyApp;
