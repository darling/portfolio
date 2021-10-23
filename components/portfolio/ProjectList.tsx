import { sample } from 'lodash';
import { global } from '../../data/projects';
import { classNames, colorSchemes } from '../../util/colors';

// Component to list the projects in my portfolio

export const ProjectList = () => {
	return (
		<div className="grid md:grid-cols-2 gap-2">
			{global.projects.map((project, index) => (
				<Project key={index} project={project} />
			))}
		</div>
	);
};

const Project = ({ project }) => {
	const color = sample(colorSchemes);

	return (
		<div
			className={classNames(
				'bg-white p-2 rounded-lg shadow-md border flex flex-row md:flex-col gap-2',
				color.border
			)}
		>
			<a
				className="hidden md:block"
				href={project.link}
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					className="md:rounded-lg shadow-md hover:opacity-80"
					src={project.image}
					alt={project.title}
				/>
			</a>
			<div className="w-full">
				<a
					className={classNames(
						'font-bold hover:bg-gray-200',
						color.accent
					)}
					href={project.link}
					target="_blank"
					rel="noopener noreferrer"
				>
					{project.title}
				</a>
				<p className="text-base">{project.description}</p>
			</div>
		</div>
	);
};
