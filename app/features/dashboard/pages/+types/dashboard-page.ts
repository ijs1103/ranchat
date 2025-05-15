import type { LoaderFunctionArgs, MetaFunction } from "react-router";

export namespace Route {
  export type LoaderArgs = LoaderFunctionArgs;
  export type MetaArgs = Parameters<MetaFunction>[0];
  export interface ComponentProps {
    loaderData?: any;
  }
}
