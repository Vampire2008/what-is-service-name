<template>
    <nav
        class="navbar navbar-expand-sm navbar-light bg-light"
    >
        <div class="container-fluid">
            <a class="navbar-brand" href="#">{{ t("title") }}</a>
            <div class="d-flex justify-content-end">
                <LocaleSelector />
                <div>
                    <a href="https://github.com/Vampire2008/what-is-service-name" title="GitHub repository">
                        <GithubIcon width="30" height="30" />
                    </a>
                </div>
            </div>
        </div>
    </nav>
    
</template>

<script setup lang="ts">
import GithubIcon from '@/assets/github.svg';
import { useI18n } from 'vue-i18n';
import LocaleSelector from './LocaleSelector.vue';

const { t } = useI18n();

</script>