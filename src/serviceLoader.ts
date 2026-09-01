import type { IServiceData } from "./models/CompareResults";
import type ISelectable from "./models/ISelectable";
import type IGitHubClient from "./IGitHubClient";

export default class ServiceLoader {
	#cache = new Map<string, IServiceData[]>();
	#client: IGitHubClient;

	constructor(client: IGitHubClient) {
		this.#client = client;
	}

	public async loadServiceData(culture: ISelectable): Promise<IServiceData[]> {
		if (this.#cache.has(culture.name)) {
			return this.#cache.get(culture.name) ?? [];
		}
		const services = await this.#client
			.getFileContent(`data/all/${culture.name}.json`)
			.then((content) => JSON.parse(content) as IServiceData[]);
		this.#cache.set(culture.name, services);
		return services;
	}
}
