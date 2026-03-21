<template>
  <div class="container-fluid">
    <h1>What is service name</h1>
    <div>Description</div>
    <div class="row">
      <div class="col-6">
        <CultureSelector v-model:leftCulture="selectedLeftCulture" v-model:rightCulture="selectedRightCulture" />
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
import { computed, ref, watchEffect } from 'vue';
import LoadingIndicator from '@/components/loading-indicator.vue';
import Compare from '@/components/compare.vue';
import ServiceLoader from '@/serviceLoader';
import CompareResults from '@/models/CompareResults';
import { useAsyncState } from '@vueuse/core';
import CultureSelector from './culture-selector.vue';
import type ISelectable from '@/models/ISelectable';

const selectedLeftCulture = ref<ISelectable | null>(null);
const selectedRightCulture = ref<ISelectable | null>(null);

const isSelectionComplete = computed(() => {
  return !!selectedLeftCulture.value && !!selectedRightCulture.value;
});

const serviceLoader = new ServiceLoader();

const { state: compareResults, isLoading, execute } = useAsyncState(
  async () => {
    if (isSelectionComplete.value) {
      const leftServices = await serviceLoader.loadServiceData(selectedLeftCulture.value!);
      const rightServices = await serviceLoader.loadServiceData(selectedRightCulture.value!);
      const compareResults = new CompareResults(selectedLeftCulture.value!, selectedRightCulture.value!, leftServices, rightServices);
      return compareResults;
    }
  },
  null as CompareResults | null,
  { immediate: false }
);

watchEffect(async () => {
  if (isSelectionComplete.value) {
    await execute();
  }
});
</script>

<style scoped></style>
