import type { IServiceData } from "./models/CompareResults";
import GithubClient from "./githubClient";
import type ISelectable from "./models/ISelectable";

export default class ServiceLoader {
    #cache = new Map<string, IServiceData[]>();
    #client = new GithubClient();

    public async loadServiceData(culture: ISelectable): Promise<IServiceData[]> {
        if (this.#cache.has(culture.name)) {
            return this.#cache.get(culture.name) ?? [];
        }
        const services = await this.#client.getFileContent(`data/all/${culture.name}.json`).then(content => JSON.parse(content) as IServiceData[]);
        this.#cache.set(culture.name, services);
        return services;
    }
}