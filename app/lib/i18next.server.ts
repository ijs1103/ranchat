import { createCookie } from "react-router";
import { RemixI18Next } from "remix-i18next/server";
import i18n from "~/i18n";
import en from "~/locales/en";
import ko from "~/locales/ko";


export const localeCookie = createCookie("locale", {
  path: "/",
  sameSite: "lax",
});

const i18next = new RemixI18Next({
  detection: {
    cookie: localeCookie,
    supportedLanguages: i18n.supportedLngs as unknown as string[],
    fallbackLanguage: i18n.fallbackLng,
  },
  i18next: {
    ...i18n,
    resources: {
      en: {
        common: en,
      },
      ko: {
        common: ko,
      },
    },
  },
});

export default i18next;
