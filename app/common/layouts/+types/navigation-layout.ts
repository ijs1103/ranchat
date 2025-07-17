import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";

export interface LoaderArgs extends LoaderFunctionArgs {}
export interface ActionArgs extends ActionFunctionArgs {}

export namespace Route {
  export type LoaderArgs = LoaderArgs;
  export type ActionArgs = ActionArgs;
  export type ComponentProps = {
    loaderData: {
      user: {
        name: string;
        email?: string;
        avatarUrl?: string | null;
      };
    };
  };
}
