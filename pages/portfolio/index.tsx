import { Dictionary, first, map, sample } from 'lodash';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { Layout } from '../../components/Layout';
import { useMusicContext } from '../../context/musicContext';
import { IProjectData } from '../../types/projects';
import { getListOfProjects, getProjects } from '../../util/projects';

const Portfolio = ({ projectList }: { projectList: IProjectData[] }) => {
	const music = useMusicContext();

	const [currentProject, setCurrentProject] = useState(0);

	const nextProject = () => {
		setCurrentProject(currentProject + 1);
	};

	const prevProject = () => {
		setCurrentProject(currentProject - 1);
	};

	const currentProjectData = projectList[currentProject];

	return (
		<Layout>
			<h1 className="text-7xl font-bold">Portfolio</h1>

			<div className="flex flex-col gap-4">
				<h2 className="relative text-4xl font-bold z-20">
					{currentProjectData.title}
				</h2>
				<div>
					<p className="text-lg">{currentProjectData.description}</p>
				</div>
				<div>
					<img className="" src={currentProjectData.images[0].url} />
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
				{map(projectList, (project) => {
					return (
						<div className="flex flex-col gap-4">
							<h2 className="relative text-4xl font-bold z-20">
								{project.title}
							</h2>
							<div className="z-20">{project.description}</div>
						</div>
					);
				})}
			</div>

			<Link href={'/'}>
				<a className="text-2xl font-bold">Return Home</a>
			</Link>

			<pre>
				<code>{JSON.stringify(projectList, null, 2)}</code>
			</pre>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const projectList = getProjects();

	return {
		props: {
			projectList,
		},
	};
};

export default Portfolio;
