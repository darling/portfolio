import { createCanvas, Image } from 'canvas';
import {
	min,
	max,
	map,
	reduce,
	round,
	sortBy,
	chunk,
	toString,
	padStart,
} from 'lodash';
import { RGBColor } from '../types/color';

export const getColorsFromImage = (img: Image) => {
	const canvas = createCanvas(img.width, img.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0);
	const imageData = ctx.getImageData(0, 0, img.width, img.height);
	const srgbPixelData = chunk(imageData.data, 4);
	const rgbPixelData: RGBColor[] = srgbPixelData.map(([r, g, b, _]) => ({
		r,
		g,
		b,
	}));

	return findAverageColorsFromPixels(rgbPixelData);
};

export const findAverageColorsFromPixels = (pixels: RGBColor[]) => {
	const rgbList = quantization(pixels, 4);

	// Sort rgbList by luminance
	const sortedRgbList = sortBy(rgbList, (color) => {
		const luminance =
			0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
		return luminance;
	});

	// Take the list and convert it to full 6 digit hex values
	const hexList = sortedRgbList.map((rgb) => {
		const hvb = map(rgb, (v) => padStart(v.toString(16), 2, '0'));
		return `#${hvb.join('')}`;
	});

	return hexList;
};

const findBiggestColorRange = (colors: RGBColor[]) => {
	// Find the minimum and maximum RGB values
	const r = map(colors, 'r');
	const g = map(colors, 'g');
	const b = map(colors, 'b');

	const minR = min(r);
	const minG = min(g);
	const minB = min(b);

	const maxR = max(r);
	const maxG = max(g);
	const maxB = max(b);

	// Find the biggest range
	const ranges = [maxR - minR, maxG - minG, maxB - minB];

	// Return 'r', 'g', or 'b' depending on the biggest range
	return ['r', 'g', 'b'][ranges.indexOf(max(ranges))];
};

const quantization = (colors: RGBColor[], depth: number): RGBColor[] => {
	// base case
	if (depth === 0 || colors.length === 0) {
		// Find the median of the RGB values
		const sumColor = reduce<RGBColor>(colors, (acc, color) => {
			return {
				r: acc.r + color.r,
				g: acc.g + color.g,
				b: acc.b + color.b,
			};
		});

		// Find the median of the RGB values
		const avgColor = {
			r: sumColor.r / colors.length,
			g: sumColor.g / colors.length,
			b: sumColor.b / colors.length,
		};

		// Round each channel
		return [
			{
				r: round(avgColor.r),
				g: round(avgColor.g),
				b: round(avgColor.b),
			},
		];
	}

	// Find the largest color range
	const biggestRange = findBiggestColorRange(colors);

	// Sort the colors by the biggest range
	const sortedColors = sortBy(colors, biggestRange);

	// Split the colors into two groups
	const [left, right] = chunk(
		sortedColors,
		Math.ceil(sortedColors.length / 2)
	);

	// return the quantization of the left and right groups
	return [
		...quantization(left, depth - 1),
		...quantization(right, depth - 1),
	];
};
