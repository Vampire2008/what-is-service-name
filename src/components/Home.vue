<template>
	https://eslint.vuejs.org/rules/multi-word-component-names.html
	<div class="container-fluid">
		<h1>What is service name</h1>
		<div>Description</div>
		<div class="row">
			<div class="col-6">
				<Suspense>
					<CultureSelector
						v-model:leftCulture="selectedLeftCulture"
						v-model:rightCulture="selectedRightCulture"
					/>
					<template #fallback>
						<LoadingIndicator />
					</template>
				</Suspense>
			</div>
		</div>
		<div>
			<div v-if="isSelectionComplete">
				<h2>Results</h2>
				<LoadingIndicator v-if="isLoading" />
				<Compare v-else :services="compareResults!" />
			</div>
			<div v-else>
				<h2>Please make selections to see the results.</h2>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import LoadingIndicator from "@/components/LoadingIndicator.vue";
import Compare from "@/components/Compare.vue";
import CompareResults from "@/models/CompareResults";
import { useAsyncState } from "@vueuse/core";
import CultureSelector from "./CultureSelector.vue";
import type ISelectable from "@/models/ISelectable";
import { createServiceLoader } from "@/ServiceProvider.ts";

const selectedLeftCulture = ref<ISelectable | null>(null);
const selectedRightCulture = ref<ISelectable | null>(null);

const isSelectionComplete = computed(() => {
	return !!selectedLeftCulture.value && !!selectedRightCulture.value;
});

const serviceLoader = createServiceLoader();

const {
	state: compareResults,
	isLoading,
	execute,
} = useAsyncState(
	async () => {
		if (isSelectionComplete.value) {
			const leftServices = await serviceLoader.loadServiceData(selectedLeftCulture.value!);
			const rightServices = await serviceLoader.loadServiceData(selectedRightCulture.value!);
			const compareResults = new CompareResults(
				selectedLeftCulture.value!,
				selectedRightCulture.value!,
				leftServices,
				rightServices,
			);
			return compareResults;
		}
	},
	null as CompareResults | null,
	{ immediate: false },
);

watch([selectedLeftCulture, selectedRightCulture], async () => {
	if (isSelectionComplete.value) {
		await execute();
	}
});
</script>

<style scoped></style>
