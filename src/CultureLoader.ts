import GithubClient from "./githubClient";
import type ISelectable from "./models/ISelectable";
import cultureMap from "@/cultureMap.json";

export default class CultureLoader {
    #client = new GithubClient();

    public async loadCultures(): Promise<ISelectable[]> {
        const cultures = (await this.#client.getFiles("data/all")).map(file => file.replace(".json", ""));
        return cultures.map(culture => ({
            name: culture,
            displayName: (cultureMap as Record<string, string>)[culture] ?? culture
        }));
    }
}
