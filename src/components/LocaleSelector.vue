<template>
    <div>
        <!-- <label for="localeSelector" class="form-label">City</label> -->
        <select class="form-select form-select-sm" id="localeSelector" v-model="locale">
            <option v-for="loc in availableLocales" :key="loc" :value="loc">
                {{ loc }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { locale, availableLocales } = useI18n();
</script>
