import CultureLoader from "./CultureLoader";
import GithubClient from "./GithubClient";
import ServiceLoader from "./ServiceLoader";

function createGithubClient() {
	return new GithubClient();
}

export function createServiceLoader() {
	return new ServiceLoader(createGithubClient());
}

export function createCultureLoader() {
	return new CultureLoader(createGithubClient());
}
