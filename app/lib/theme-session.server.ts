import { createCookieSessionStorage } from "react-router";
import { createThemeSessionResolver } from "remix-themes";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: false,
    sameSite: "lax",
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
