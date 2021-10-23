export interface IPortfolioProject {
	title: string;
	description: string;
	link: string;
	image: string;
}

export interface IPortfolioProjects {
	projects: IPortfolioProject[];
}
