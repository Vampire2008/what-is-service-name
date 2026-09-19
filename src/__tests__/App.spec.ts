import { describe, expect, test } from "vitest";

import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import { RouterView } from "vue-router";
import router from "@/router";
import i18n from "@/i18n";

describe("App", () => {
	test("mounts renders properly", () => {
		const wrapper = mount(App, {
			global: {
				plugins: [router, i18n],
			},
		});
		const components = wrapper.findAllComponents(RouterView);
		expect(components).toHaveLength(1);
	});
});
