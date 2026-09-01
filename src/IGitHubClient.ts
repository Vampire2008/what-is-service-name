export default interface IGitHubClient {
	getFileContent(path: string): Promise<string>;
	getFolders(path: string): Promise<string[]>;
	getFiles(path: string): Promise<string[]>;
}
