import Head from 'next/head';
import React, { FC } from 'react';

const Layout: FC = (props) => {
	return (
		<>
			<Head key="head">
				<div>
					{/* Primary Meta Tags */}
					<title>
						Safe is a Developer trying to find out what he wants to
						do with his time.
					</title>
					<meta
						name="title"
						content="Safe is a Developer trying to find out what he wants to do with his time."
					/>
					<meta
						name="description"
						content="I press things on my keyboard and more things show up on screen, pretty neat."
					/>
					{/* Open Graph / Facebook */}
					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://www.ey.lc/" />
					<meta
						property="og:title"
						content="Safe is a Developer trying to find out what he wants to do with his time."
					/>
					<meta
						property="og:description"
						content="I press things on my keyboard and more things show up on screen, pretty neat."
					/>
					<meta
						property="og:image"
						content="https://files.catbox.moe/1wt75c.webp"
					/>
					{/* Twitter */}
					<meta
						property="twitter:card"
						content="summary_large_image"
					/>
					<meta property="twitter:url" content="https://www.ey.lc/" />
					<meta
						property="twitter:title"
						content="Safe is a Developer trying to find out what he wants to do with his time."
					/>
					<meta
						property="twitter:description"
						content="I press things on my keyboard and more things show up on screen, pretty neat."
					/>
					<meta
						property="twitter:image"
						content="https://files.catbox.moe/1wt75c.webp"
					/>
				</div>
			</Head>
			<div className="min-h-screen bg-gray-900 overflow-scroll">
				{props.children}
			</div>
		</>
	);
};

export { Layout };
