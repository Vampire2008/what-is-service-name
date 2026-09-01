import { beforeEach, describe, expect, test, vi } from "vitest";
import type { IServiceData } from "../models/CompareResults";
import ServiceLoader from "../ServiceLoader";

describe("ServiceLoader", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("loads service data for a given culture", async () => {
		const mock = {
			getFileContent: vi.fn(),
			getFiles: vi.fn(),
			getFolders: vi.fn(),
		};
		const serviceData: IServiceData[] = [
			{ name: "Service A", displayName: "Service A", description: "Description A" },
		];

		const loader = new ServiceLoader(mock);
		mock.getFileContent.mockResolvedValue(JSON.stringify(serviceData));

		const result = await loader.loadServiceData({ name: "en-US", displayName: "English (United States)" });

		expect(mock.getFileContent).toHaveBeenCalledTimes(1);
		expect(mock.getFileContent).toHaveBeenCalledWith("data/all/en-US.json");
		expect(result).toEqual(serviceData);
	});

	test("caches results and does not call GitHubClient twice for same culture", async () => {
		const serviceData: IServiceData[] = [
			{ name: "Service B", displayName: "Service B", description: "Description B" },
		];

		const mock = {
			getFileContent: vi.fn(),
			getFiles: vi.fn(),
			getFolders: vi.fn(),
		};
		const loader = new ServiceLoader(mock);
		mock.getFileContent.mockResolvedValue(JSON.stringify(serviceData));

		const first = await loader.loadServiceData({ name: "ru-RU", displayName: "Russian (Russia)" });
		const second = await loader.loadServiceData({ name: "ru-RU", displayName: "Russian (Russia)" });

		expect(mock.getFileContent).toHaveBeenCalledTimes(1);
		expect(first).toEqual(second);
		expect(second).toEqual(serviceData);
	});
});
