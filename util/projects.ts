import { readdir, readdirSync } from 'fs';
import { kebabCase, keyBy, map, mapKeys } from 'lodash';
import { projectList } from '../projects/projects';

export const getListOfProjects = () => {
	return map(projectList, 'title');
};

// Dynamically import the project files
export const getProjects = () => {
	return projectList;
};
