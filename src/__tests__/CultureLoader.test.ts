import CultureLoader from "@/CultureLoader";
import { describe, expect, test, vi } from "vitest";

describe("CultureLoader", () => {
	test("loadCultures_successReturnsCultures", async () => {
		const mock = {
			getFileContent: vi.fn(),
			getFiles: vi.fn(),
			getFolders: vi.fn(),
		};
		mock.getFiles.mockResolvedValue(["en-US.json", "ru-RU.json", "de-DE.json"]);
		const cultureLoader = new CultureLoader(mock);
		const cultures = await cultureLoader.loadCultures();
		expect(cultures).toEqual([
			{ name: "en-US", displayName: "English (United States)" },
			{ name: "ru-RU", displayName: "Russian (Russia)" },
			{ name: "de-DE", displayName: "de-DE" },
		]);
	});
});
