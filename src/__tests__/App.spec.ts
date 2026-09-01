import { describe, expect, test } from "vitest";

import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import { RouterView } from "vue-router";
import router from "@/router";

describe("App", () => {
	test("mounts renders properly", () => {
		const wrapper = mount(App, {
			global: {
				plugins: [router],
			},
		});
		const components = wrapper.findAllComponents(RouterView);
		expect(components).toHaveLength(1);
	});
});
