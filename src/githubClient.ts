import { Octokit } from "octokit";
import config from "./config";
import type IGitHubClient from "./IGitHubClient";

export default class GithubClient implements IGitHubClient {
	#client: Octokit;

	constructor() {
		this.#client = new Octokit();
	}

	public async getFileContent(path: string): Promise<string> {
		const response = await this.#client.rest.repos.getContent({
			owner: config.owner,
			repo: config.reposity,
			path: path,
		});
		if (response.status !== 200) {
			if (response.status === 404) {
				throw new Error(`Not found: ${path}`);
			}
			throw new Error(`Failed to load file content: ${response.status}`);
		}
		if (Array.isArray(response.data) || response.data.type !== "file") {
			throw new Error(`No such file: ${path}`);
		}
		const bytes = Uint8Array.fromBase64(response.data.content);

		return new TextDecoder().decode(bytes);
	}

	public async getFolders(path: string): Promise<string[]> {
		const response = await this.#client.rest.repos.getContent({
			owner: config.owner,
			repo: config.reposity,
			path: path,
		});
		if (response.status !== 200) {
			throw new Error(`Failed to load folders: ${response.status}`);
		}
		if (!Array.isArray(response.data)) {
			throw new Error(`Not a folder: ${path}`);
		}
		return response.data.filter((item) => item.type === "dir").map((item) => item.name);
	}

	public async getFiles(path: string): Promise<string[]> {
		const response = await this.#client.rest.repos.getContent({
			owner: config.owner,
			repo: config.reposity,
			path: path,
		});
		if (response.status !== 200) {
			throw new Error(`Failed to load files: ${response.status}`);
		}
		if (!Array.isArray(response.data)) {
			throw new Error(`Not a folder: ${path}`);
		}
		return response.data.filter((item) => item.type === "file").map((item) => item.name);
	}
}
