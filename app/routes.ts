import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("common/pages/home-page.tsx"),
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
    route("/dashboard", "features/dashboard/pages/dashboard-page.tsx"),
    layout("common/layouts/private.layout.tsx", { id: "private-auth" }, [
      // 로그인 상태에서만 접근 가능한 기타 라우트들
      // route("/logout", "features/auth/pages/logout-page.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
