import { createI18n } from "vue-i18n";

import en from "./locale/en.json";
import ru from "./locale/ru.json";

const i18n = createI18n({
    legacy: false,
    locale: window.navigator.language,
    fallbackLocale: "en",
    messages: {
        en,
        ru
    }
});

export default i18n;
