import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigate,
  useNavigation,
  useRouteLoaderData,
  useSearchParams,
} from "react-router";
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css?url";
import { PreventFlashOnWrongTheme, ThemeProvider } from "remix-themes";
import type { Route } from "./+types/root";
import "./app.css";
import { useTheme } from "remix-themes";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next/react";
import { themeSessionResolver } from "./lib/theme-session.server";
import i18next from "~/lib/i18next.server";
import { Toaster } from "sonner";
import { cn } from "./lib/utils";
import { useEffect } from "react";

export async function loader({ request }: Route.LoaderArgs) {
  if (
    !process.env.DATABASE_URL ||
    !process.env.SUPABASE_URL ||
    !process.env.SUPABASE_ANON_KEY ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.DATABASE_URL === "" ||
    process.env.SUPABASE_URL === "" ||
    process.env.SUPABASE_ANON_KEY === "" ||
    process.env.SUPABASE_SERVICE_ROLE_KEY === ""
  ) {
    throw new Error("Missing Supabase environment variables");
  }

  const [{ getTheme }, locale] = await Promise.all([
    themeSessionResolver(request),
    i18next.getLocale(request),
  ]);

  return {
    theme: getTheme(),
    locale,
  };
}

export const handle = {
  i18n: "common",
};

function InnerLayout({ children }: { children: React.ReactNode }) {
  const [theme] = useTheme();
  const data = useRouteLoaderData<typeof loader>("root");
  const { i18n } = useTranslation();
  const { pathname } = useLocation();

  useChangeLanguage(data?.locale ?? "en");

  return (
    <html
      lang={data?.locale ?? "en"}
      className={cn(theme ?? "", "h-full")}
      dir={i18n.dir()}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data?.theme)} />
      </head>
      <body className="h-full">
        {children}
        <Toaster richColors position="bottom-right" />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData("root");
  return (
    <ThemeProvider
      specifiedTheme={data?.theme ?? "dark"} // Default to dark theme if none is specified
      themeAction="/api/settings/theme" // API endpoint for changing theme
    >
      <InnerLayout>{children}</InnerLayout>
    </ThemeProvider>
  );
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: nProgressStyles },
];

export default function App() {
  const navigation = useNavigation();

  useEffect(() => {
    NProgress.configure({ showSpinner: true });
  }, []);

  useEffect(() => {
    if (navigation.state === "loading") {
      NProgress.start();
    } else if (navigation.state === "idle") {
      NProgress.done();
    }
  }, [navigation.state]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      const error = searchParams.get("error");
      const code = searchParams.get("code");
      if (error) {
        // Redirect to error page if authentication failed
        navigate(`/error?${searchParams.toString()}`);
      } else if (code) {
        // Redirect to main page
        navigate("/");
      }
    }
  }, [searchParams]);

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
