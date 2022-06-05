import Link from 'next/link';

import { Layout } from '../components/Layout';

const About = () => {
	return (
		<Layout>
			<h1 className="text-7xl font-bold">About Me</h1>
			<p>Carter Black is a developer looking to spend his time.</p>
			<Link href="/">
				<a className="text-2xl font-bold">Return Home</a>
			</Link>
		</Layout>
	);
};

export default About;
