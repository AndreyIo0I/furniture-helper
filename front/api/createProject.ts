import {projectApi} from './api'

interface CreateProjectParams {
	name: string;
	contractNumber: string;
	dateOfStart: string;
	deadLine: string;
	clientId: number;
	description: string;
}

export default function createProject(params: CreateProjectParams) {
	return projectApi.projectsPost(params)
}