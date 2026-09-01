import { describe, test, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import router from "@/router";
import { defineComponent } from "vue";

const cultureLoaderMock = {
	loadCultures: vi.fn(),
};

vi.mock(import("../../ServiceProvider"), () => ({
	createCultureLoader: vi.fn(() => cultureLoaderMock),
}));

describe("CultureSelector", () => {
	test.skip("Selection of cultures triggers the correct events", async () => {
		const CultureSelector = (await import("../../components/CultureSelector.vue")).default;

		cultureLoaderMock.loadCultures.mockResolvedValue([
			{ name: "en", displayName: "English" },
			{ name: "ru", displayName: "Russian" },
		]);

		const TestWrapper = defineComponent({
			components: { CultureSelector },
			props: {
				leftCulture: {
					type: Object,
					default: null,
				},
				rightCulture: {
					type: Object,
					default: null,
				},
			},
			emits: ["update:leftCulture", "update:rightCulture"],
			template:
				'<Suspense><CultureSelector v-model:leftCulture="leftCulture" v-model:rightCulture="rightCulture" /></Suspense>',
		});

		const wrapper = mount(CultureSelector, {
			props: {
				leftCulture: null,
				"onUpdate:leftCulture": (value: string) => {
					wrapper.setProps({ leftCulture: value });
				},
				rightCulture: null,
				"onUpdate:rightCulture": (value: string) => {
					wrapper.setProps({ rightCulture: value });
				},
			},
			global: {
				plugins: [router],
			},
		});

		const leftSelect = wrapper.findAll("select")[0];
		const rightSelect = wrapper.findAll("select")[1];
		leftSelect.setValue("en");
		expect(wrapper.props("leftCulture")).toBe("en");
		rightSelect.setValue("ru");
		expect(wrapper.props("rightCulture")).toBe("ru");
	});
});
