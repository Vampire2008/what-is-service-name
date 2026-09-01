<template>
	<div>
		<table class="table table-striped">
			<thead>
				<tr>
					<th rowspan="2" class="middle">Service Name</th>
					<th colspan="2">{{ services.leftCulture.displayName }}</th>
					<th colspan="2">{{ services.rightCulture.displayName }}</th>
				</tr>
				<tr>
					<th>Display Name</th>
					<th>Description</th>
					<th>Display Name</th>
					<th>Description</th>
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

const { services } = defineProps<{
	services: CompareResults;
}>();
</script>

<style lang="css" scoped>
.middle {
	vertical-align: middle;
}
</style>
