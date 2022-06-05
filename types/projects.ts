export interface IProjectData {
	title: string;
	description: string;
	links: IProjectLink[];
	images: IProjectPhoto[];
	markDownContent: string;
}

export interface IProjectLink {
	name: string;
	url: string;
}

export interface IProjectPhoto {
	name: string;
	url: string;
}
