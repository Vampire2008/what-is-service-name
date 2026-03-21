<template>
    <div class="row">
        <div class="col">
            <select v-model="leftCulture" class="form-select form-select-lg">
                <option selected>Select one</option>
                <option v-for="culture in cultures" :key="culture.name" :value="culture">{{ culture.displayName }}</option>
            </select>     
        </div>
        <div class="col">
            <select v-model="rightCulture" class="form-select form-select-lg">
                <option selected>Select one</option>
                <option v-for="culture in cultures" :key="culture.name" :value="culture">{{ culture.displayName }}</option>
            </select>     
        </div>
    </div>
</template>

<script setup lang="ts">
import CultureLoader from '@/CultureLoader';
import type ISelectable from '@/models/ISelectable';
import { useRouteQuery } from '@vueuse/router';
import { watch } from 'vue';

const cultures = await new CultureLoader().loadCultures();

const leftCultureQuery = useRouteQuery<string | null>('left-culture', null, { mode: 'push' });
const rightCultureQuery = useRouteQuery<string | null>('right-culture', null, { mode: 'push' });

const leftCulture = defineModel<ISelectable | null>('leftCulture', { required: true });
const rightCulture = defineModel<ISelectable | null>('rightCulture', { required: true });

leftCulture.value = cultures.find(c => c.name === leftCultureQuery.value) ?? null;
rightCulture.value = cultures.find(c => c.name === rightCultureQuery.value) ?? null;

watch(leftCulture, (newValue) => {
    leftCultureQuery.value = newValue?.name ?? null;
});

watch(rightCulture, (newValue) => {
    rightCultureQuery.value = newValue?.name ?? null;
});
</script>