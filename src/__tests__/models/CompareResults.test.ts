import { describe, test, expect } from "vitest";
import CompareResults from "@/models/CompareResults";

describe("CompareResults", () => {
	test("Load and sort services", () => {
		const leftCulture = { name: "en-US", displayName: "English (United States)" };
		const rightCulture = { name: "ru-RU", displayName: "Russian (Russia)" };
		const leftData = [
			{ name: "ServiceA", displayName: "Service A", description: "Description A" },
			{ name: "ServiceB", displayName: "Service B", description: "Description B" },
		];
		const rightData = [
			{ name: "ServiceB", displayName: "Сервис Б", description: "Описание Б" },
			{ name: "ServiceC", displayName: "Сервис В", description: "Описание В" },
		];

		const compareResults = new CompareResults(leftCulture, rightCulture, leftData, rightData);

		expect(compareResults.services).toEqual([
			{
				name: "ServiceA",
				leftLocalizedData: { displayName: "Service A", description: "Description A" },
				rightLocalizedData: { displayName: "", description: "" },
			},
			{
				name: "ServiceB",
				leftLocalizedData: { displayName: "Service B", description: "Description B" },
				rightLocalizedData: { displayName: "Сервис Б", description: "Описание Б" },
			},
			{
				name: "ServiceC",
				leftLocalizedData: { displayName: "", description: "" },
				rightLocalizedData: { displayName: "Сервис В", description: "Описание В" },
			},
		]);
	});
});
