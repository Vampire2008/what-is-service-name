import type ISelectable from "./ISelectable";

export default class CompareResults {
	public readonly services: IService[];

	constructor(
		public readonly leftCulture: ISelectable,
		public readonly rightCulture: ISelectable,
		leftData: IServiceData[],
		rightData: IServiceData[],
	) {
		const serviceMap = new Map<string, IService>();
		for (const leftService of leftData) {
			serviceMap.set(leftService.name, {
				name: leftService.name,
				leftLocalizedData: {
					displayName: leftService.displayName,
					description: leftService.description,
				},
				rightLocalizedData: {
					displayName: "",
					description: "",
				},
			});
		}
		for (const rightService of rightData) {
			if (!serviceMap.has(rightService.name)) {
				serviceMap.set(rightService.name, {
					name: rightService.name,
					leftLocalizedData: {
						displayName: "",
						description: "",
					},
					rightLocalizedData: {
						displayName: rightService.displayName,
						description: rightService.description,
					},
				});
			} else {
				const service = serviceMap.get(rightService.name)!;
				service.rightLocalizedData = {
					displayName: rightService.displayName,
					description: rightService.description,
				};
			}
		}
		this.services = Array.from(serviceMap.values());
		this.services.sort((a, b) => CompareResults.ordinalCompare(a.name, b.name));
	}

	private static ordinalCompare(a: string, b: string): number {
		return a == b ? 0 : a < b ? -1 : 1;
	}
}

export interface IService {
	name: string;
	leftLocalizedData: IServiceLocalizedData;
	rightLocalizedData: IServiceLocalizedData;
}

export interface IServiceLocalizedData {
	displayName: string;
	description: string;
}

export interface IServiceData {
	name: string;
	displayName: string;
	description: string;
}
