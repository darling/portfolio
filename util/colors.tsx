export const colorSchemes: {
	text: string;
	hoverText: string;
	accent: string;
	border: string;
}[] = [
	{
		text: 'text-red-50',
		hoverText: 'hover:text-red-300',
		accent: 'text-red-500',
		border: 'border-red-500',
	},
	{
		text: 'text-blue-50',
		hoverText: 'hover:text-blue-300',
		accent: 'text-blue-500',
		border: 'border-blue-500',
	},
	{
		text: 'text-green-50',
		hoverText: 'hover:text-green-300',
		accent: 'text-green-500',
		border: 'border-green-500',
	},
	{
		text: 'text-yellow-50',
		hoverText: 'hover:text-yellow-300',
		accent: 'text-yellow-500',
		border: 'border-yellow-500',
	},
	{
		text: 'text-indigo-50',
		hoverText: 'hover:text-indigo-300',
		accent: 'text-indigo-500',
		border: 'border-indigo-500',
	},
	{
		text: 'text-pink-50',
		hoverText: 'hover:text-pink-300',
		accent: 'text-pink-500',
		border: 'border-pink-500',
	},
	{
		text: 'text-orange-50',
		hoverText: 'hover:text-orange-300',
		accent: 'text-orange-500',
		border: 'border-orange-500',
	},
];

export function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(' ');
}
