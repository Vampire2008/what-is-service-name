import { Octokit } from "octokit";
import NotFoundError from "./NotFoundError";

export default class GithubClient {
    // TODO: Move these to config
	#owner: string = "Vampire2008";
    #reposity: string = "what-is-service-name";
	#client: Octokit;

	constructor() {
		this.#client = new Octokit();
	}

	public async getFileContent(path: string): Promise<string> {
		const response = await this.#client.rest.repos.getContent({
			owner: this.#owner,
			repo: this.#reposity,
			path: path,
		});
		if (response.status !== 200) {
            if (response.status === 404) {
                throw new NotFoundError(path);
            }
            throw new Error(`Failed to load file content: ${response.status}`);
        }
        if(Array.isArray(response.data) || response.data.type !== 'file') {
            throw new Error(`No such file: ${path}`);
        }
        return atob(response.data.content);
	}

    public async getFolders(path: string): Promise<string[]> {
        const response = await this.#client.rest.repos.getContent({
            owner: this.#owner,
            repo: this.#reposity,
            path: path
        });
        if (response.status !== 200) {
            throw new Error(`Failed to load folders: ${response.status}`);
        }
        if(!Array.isArray(response.data)) {
            throw new Error(`Not a folder: ${path}`);
        }
        return response.data.filter(item => item.type === "dir").map(item => item.name);
    }

    public async getFiles(path: string): Promise<string[]> {
        const response = await this.#client.rest.repos.getContent({
            owner: this.#owner,
            repo: this.#reposity,
            path: path
        });
        if (response.status !== 200) {
            throw new Error(`Failed to load files: ${response.status}`);
        }
        if(!Array.isArray(response.data)) {
            throw new Error(`Not a folder: ${path}`);
        }
        return response.data.filter(item => item.type === "file").map(item => item.name);
    }
}
