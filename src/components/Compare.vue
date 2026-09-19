<template>
	<div>
		<table class="table table-striped">
			<thead>
				<tr>
					<th rowspan="2" class="middle">{{ t('service-name-title') }}</th>
					<th colspan="2">{{ t(`cultures.${services.leftCulture.name}`) }}</th>
					<th colspan="2">{{ t(`cultures.${services.rightCulture.name}`) }}</th>
				</tr>
				<tr>
					<th>{{ t('display-name-title') }}</th>
					<th>{{ t('description-title') }}</th>
					<th>{{ t('display-name-title') }}</th>
					<th>{{ t('description-title') }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="service in services.services" :key="service.name">
					<td>{{ service.name }}</td>
					<td>{{ service.leftLocalizedData.displayName }}</td>
					<td>{{ service.leftLocalizedData.description }}</td>
					<td>{{ service.rightLocalizedData.displayName }}</td>
					<td>{{ service.rightLocalizedData.description }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import type CompareResults from "@/models/CompareResults";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { services } = defineProps<{
	services: CompareResults;
}>();
</script>

<style lang="css" scoped>
.middle {
	vertical-align: middle;
}
</style>
