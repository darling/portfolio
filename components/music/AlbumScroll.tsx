import { formatDistance, formatRelative } from 'date-fns';
import {
	animate,
	motion,
	MotionValue,
	useMotionValue,
	useTransform,
} from 'framer-motion';
import { random, sample, toNumber } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ITrack } from '../../types/music';
import { classNames } from '../../util/colors';

const colorCards = [
	{
		bg: 'bg-green-300',
		text: 'text-blue-800',
	},
];

const Album: FC<{
	track: ITrack;
	base: MotionValue<number>;
	index: number;
	total: number;
}> = ({ base, total, track, index }) => {
	const x = useTransform(
		base,
		[0, (100 / total) * (index + 1), (100 / total) * (index + 1), 100],
		[
			'0%',
			`${(index + 1) * -100}%`,
			`${total * 100 - (index + 1) * 100}%`,
			'0%',
		]
	);

	const [straight, setStraight] = useState(false);

	const color = colorCards[index % colorCards.length];

	return (
		<motion.li
			className="px-3 md:px-4 flex-none"
			initial={false}
			animate={
				straight
					? { rotate: 0 }
					: { rotate: [-1, 2, 1, -2, 0][index % 5] }
			}
			style={{ x }}
		>
			<motion.figure
				className={classNames(
					'flex-none overflow-hidden rounded-lg w-80 shadow-lg',
					color.bg
				)}
			>
				<div className="bg-white p-3">
					<h3 className="tracking-wide">
						<span className={classNames('font-bold', color.text)}>
							{track.name}
						</span>{' '}
						by{' '}
						<span
							className={classNames(
								'font-bold block',
								color.text
							)}
						>
							{track.artist['#text']}
						</span>
					</h3>
				</div>
				<div className="p-3">
					Listened to{' '}
					{formatDistance(
						new Date(
							toNumber(track.date?.uts || Date.now() / 1000) *
								1000
						),
						new Date(),
						{ addSuffix: true }
					)}
					.
				</div>
			</motion.figure>
			{/* <motion.img
				className="flex-none overflow-hidden rounded-lg w-32 h-32"
				src={track.image[3]['#text']}
				alt=""
			/> */}
		</motion.li>
	);
};

export const Albums: FC<{ tracks: ITrack[] }> = ({ tracks }) => {
	const x = useMotionValue(0);

	const { inView, ref: inViewRef } = useInView({
		threshold: 0,
		rootMargin: '100px',
	});

	const [duration, setDuration] = useState(250);

	useEffect(() => {
		if (!inView) return;

		const controls = animate(x, 100, {
			type: 'tween',
			duration,
			ease: 'linear',
			repeat: Infinity,
		});

		return controls.stop;
	}, [inView, x, duration]);

	return (
		<div
			ref={inViewRef}
			className="relative"
			onMouseEnter={() => setDuration(500)}
			onMouseLeave={() => setDuration(250)}
		>
			<div className="flex overflow-hidden">
				<ul className="flex items-center w-full py-24">
					{tracks.map((track, i) => (
						<Album
							key={i}
							base={x}
							index={i}
							total={tracks.length}
							track={track}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};
