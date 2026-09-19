import CultureLoader from "./CultureLoader";
import GitHubClient from "./GitHubClient";
import ServiceLoader from "./ServiceLoader";

function createGithubClient() {
	return new GitHubClient();
}

export function createServiceLoader() {
	return new ServiceLoader(createGithubClient());
}

export function createCultureLoader() {
	return new CultureLoader(createGithubClient());
}
