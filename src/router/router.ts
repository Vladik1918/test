import type { RouteProps } from "react-router";
import type { ComponentType } from "react";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";

export const Routes = {
  HOME: "/",
  REGISTER: "/register",
  LOGIN: "/login",
  NOT_FOUND: "*",
} as const;

export type IRoute = Omit<RouteProps, "element" | "index" | "children"> & {
  id: string;
  authOnly?: boolean;
  element: ComponentType;
  isIndex?: boolean;
};

export const routes: IRoute[] = [
  { id: "1", path: Routes.LOGIN, element: Login },
  { id: "2", path: Routes.HOME, element: Home, authOnly: true },
  { id: "3", path: Routes.NOT_FOUND, element: NotFound },
];
