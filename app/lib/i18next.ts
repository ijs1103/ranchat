import Backend from "i18next-fs-backend/cjs";
import { resolve } from "node:path";
import { createCookie } from "react-router";
import { RemixI18Next } from "remix-i18next/server";
import i18n from "~/i18n";

export const localeCookie = createCookie("locale", { secrets: undefined });

const i18next = new RemixI18Next({
  detection: {
    cookie: localeCookie,
    supportedLanguages: i18n.supportedLngs as unknown as string[],
    fallbackLanguage: i18n.fallbackLng,
    searchParamKey: "lang",
  },
  i18next: {
    ...i18n,
    backend: {
      loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
    },
  },
  plugins: [Backend],
});

export default i18next;
