import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<div>
						{/* Primary Meta Tags */}
						<title>
							Safe is a Developer trying to find out what he wants
							to do with his time.
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
							content="https://i.imgur.com/S4eZf6D.gif"
						/>
						{/* Twitter */}
						<meta
							property="twitter:card"
							content="summary_large_image"
						/>
						<meta
							property="twitter:url"
							content="https://www.ey.lc/"
						/>
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
							content="https://i.imgur.com/S4eZf6D.gif"
						/>
					</div>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
