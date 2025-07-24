import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("common/pages/root-page.tsx"),
  ...prefix("/auth", [
    layout("features/auth/layouts/auth-layout.tsx", [
      layout("common/layouts/public.layout.tsx", [
        route("/login", "features/auth/pages/login-page.tsx"),
        ...prefix("/social/:provider", [
          route("/start", "features/auth/pages/social-login-start-page.tsx"),
          route(
            "/complete",
            "features/auth/pages/social-login-complete-page.tsx"
          ),
        ]),
      ]),
      route("/signup", "features/auth/pages/signup-page.tsx"),
    ]),
  ]),

  layout("common/layouts/navigation-layout.tsx", { id: "authenticated" }, [
    route("/home", "features/home/pages/home-page.tsx"),
    route("/search", "features/search/pages/search-page.tsx"),
    // route("/chat", "features/chat/pages/chat-page.tsx"),
    route("/chat/:messageRoomId", "features/chat/pages/chat-page.tsx"),
    layout("common/layouts/private.layout.tsx", { id: "private-auth" }, [
      route("/logout", "features/auth/pages/logout-page.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
