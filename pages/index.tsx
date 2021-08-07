import { sample } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { Disclosure } from '@headlessui/react';

const names = ['Safe', 'Carter'];

const jobs = [
	'Developer',
	'Student',
	'Student Developer',
	'Freelance Developer',
	'Hobbyist',
	'Programmer',
	'Student Programmer',
];

// No template strings because of purgecss

const colorSchemes: { text: string; hoverText: string; accent: string }[] = [
	{
		text: 'text-red-50',
		hoverText: 'hover:text-red-300',
		accent: 'text-red-500',
	},
	{
		text: 'text-blue-50',
		hoverText: 'hover:text-blue-300',
		accent: 'text-blue-500',
	},
	{
		text: 'text-green-50',
		hoverText: 'hover:text-green-300',
		accent: 'text-green-500',
	},
	{
		text: 'text-yellow-50',
		hoverText: 'hover:text-yellow-300',
		accent: 'text-yellow-500',
	},
	{
		text: 'text-indigo-50',
		hoverText: 'hover:text-indigo-300',
		accent: 'text-indigo-500',
	},
	{
		text: 'text-pink-50',
		hoverText: 'hover:text-pink-300',
		accent: 'text-pink-500',
	},
	{
		text: 'text-orange-50',
		hoverText: 'hover:text-orange-300',
		accent: 'text-orange-500',
	},
];

interface IProjects {
	title: string;
	tech: string[];
	description: string;
	href?: string;
}

const projects: IProjects[] = [
	{
		title: 'Ferris.gg',
		tech: [
			'React',
			'Next.js',
			'Tailwind',
			'Firebase',
			'Discord.js',
			'Stripe',
		],
		description:
			'Fully automated community management. Features a Discord Bot and Website Panel. I learned a lot about React/Deployment/API usage through this project.',
		href: 'https://ferris.gg/',
	},
	{
		title: 'Bruhhouse',
		tech: ['React', 'Next.js', 'Tailwind', 'Bootstrap', 'Templating'],
		description:
			'This website takes code from creators (manually) and converts it into a really ugly form that end users could use to generate "codes" for their characters and profiles onsite. It is somewhat robust and really easy to manage codewise. This project is new and was created recently.',
		href: 'https://bruhhouse.vercel.app/',
	},
	{
		title: 'Ferris Docs',
		tech: ['React', 'Gatsby', 'Tailwind', 'GraphQL'],
		description:
			'Documentation for the Ferris.gg website. Completely independant from the original project, uses Gatsby and custom components to provide information to users.',
	},
	{
		title: 'Covid (tracker)',
		tech: ['React', 'Bulma', 'GraphQL'],
		description:
			'My first React project created in High School, used external APIs to give numbers and charts to users. Won 2nd place in the 2019 COVID-19 Repl.it Hackathon.',
		href: 'https://github.com/darling/covid',
	},
	{
		title: 'Character Checker',
		tech: ['React', 'Next.js', 'Tailwind'],
		description:
			'This website takes strings input by a user and highlights wierd or unexpected characters.',
		href: 'https://github.com/darling/characterchecker',
	},
];

const colorTransition = 'transition duration-200';

const urls = [
	{
		svg: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
				/>
			</svg>
		),
		href: 'https://ferris.gg/',
		label: 'Discord',
	},
	{
		svg: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
				/>
			</svg>
		),
		href: 'mailto:safe@ey.lc',
		label: 'email',
	},
	{
		svg: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
				/>
			</svg>
		),
		href: 'https://github.com/darling',
		label: 'github',
	},
];

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(' ');
}

export default function Home() {
	const [job, setJob] = useState(jobs[0]);
	const [color, setColor] = useState(colorSchemes[0]);
	const [name, setName] = useState(names[0]);

	const rePickElements = () => {
		setName(sample(names));
		setColor(sample(colorSchemes));
		setJob(sample(jobs));
	};

	useEffect(() => {
		rePickElements();
	}, []);

	return (
		<Layout>
			<div className="min-h-screen mb-40">
				<div
					className={classNames(
						color.text,
						'max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-8 font-mono'
					)}
				>
					<h1 className="text-3xl sm:text-5xl select-none">
						<span
							className={classNames(
								color.hoverText,
								colorTransition,
								'cursor-pointer'
							)}
							onClick={() => rePickElements()}
						>
							{name}
						</span>{' '}
						is a{' '}
						<span
							className={classNames(
								color.hoverText,
								colorTransition,
								'cursor-pointer'
							)}
							onClick={() => rePickElements()}
						>
							{job}
						</span>{' '}
						trying to find out what he wants to do with his time.
					</h1>
					<p>
						In the meantime, however, he's learning and developing
						projects using new technologies.
					</p>
					<div className={classNames('flex flex-row space-x-6')}>
						{urls.map((item) => (
							<a
								key={item.label}
								href={item.href}
								className={classNames(
									color.text,
									color.hoverText,
									colorTransition,
									'cursor-pointer flex flex-row items-center space-x-2'
								)}
							>
								<span className="text-sm font-mono">
									{item.label}
								</span>
								<div className="w-6 h-6">{item.svg}</div>
							</a>
						))}
					</div>
					<h2 className="text-lg">Selected Projects</h2>
					<div className={classNames('flex flex-col')}>
						{projects.map((project) => {
							return (
								<div key={project.title}>
									<Disclosure>
										{({ open }) => (
											<>
												<Disclosure.Button
													as="button"
													className={classNames(
														color.text,
														colorTransition,
														color.hoverText,
														'cursor-pointer select-none'
													)}
												>
													<span className="text-gray-400 font-bold">
														{open ? '-' : '+'}
													</span>{' '}
													{project.title}
												</Disclosure.Button>
												<Disclosure.Panel
													as="div"
													className="my-4 space-y-4"
												>
													<div>
														<span
															className={classNames(
																'text-xs'
															)}
														>
															Uses:{' '}
														</span>
														<div className="ml-4 md:ml-0 inline-flex flex-row flex-wrap">
															{project.tech.map(
																(item) => (
																	<span
																		key={
																			item
																		}
																		className={classNames(
																			color.hoverText,
																			'text-xs select-none mr-4'
																		)}
																	>
																		{item}
																	</span>
																)
															)}
														</div>
													</div>
													<span
														className={classNames(
															'text-xs'
														)}
													>
														Link:{' '}
														<a
															href={project.href}
															className={classNames(
																'cursor-pointer select-none',
																color.hoverText,
																'hover:underline underline md:no-underline ml-4 md:ml-0 block md:inline'
															)}
														>
															Project
														</a>
													</span>
													<p className="text-gray-400">
														{project.description}
													</p>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div
				className={classNames(
					color.text,
					'max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-8 font-mono'
				)}
			>
				<a
					href="https://sptfy.com/carter"
					className={classNames(
						color.hoverText,
						color.accent,
						'h-6 w-6'
					)}
				>
					Trade playlists with me on Spotify
				</a>
				<p>(also try clicking my name above)</p>
			</div>
		</Layout>
	);
}
