import type { RouteProps } from "react-router";
import type { ComponentType } from "react";

import { Home } from "../pages/Home";
import { LoginForm } from "../pages/LoginForm";
import { NotFound } from "../pages/NotFound";
import { RegisterForm } from "../pages/RegisterForm";
import { TripsPage } from "../pages/TripsPage";
import { TripDetailsPage } from "../pages/TripDetailsPage";
import { TripAccessPage } from './../pages/TripAccessPage';

export const Routes = {
  HOME: "/",
  REGISTER: "/register",
  LOGIN: "/login",
  TRIPS: "/trips",
  TRIP_DETAILS: "/trips/:id",
  TRIP_ACCESS: "/trips/:id/access",
  NOT_FOUND: "*",
} as const;

export type IRoute = Omit<RouteProps, "element" | "index" | "children"> & {
  id: string;
  authOnly?: boolean;
  element: ComponentType;
  isIndex?: boolean;
};

export const routes: IRoute[] = [
  { id: "1", path: Routes.LOGIN, element: LoginForm },
  { id: "2", path: Routes.REGISTER, element: RegisterForm },
  { id: "3", path: Routes.TRIPS, element: TripsPage, authOnly: true },
  { id: "4", path: Routes.TRIP_DETAILS, element: TripDetailsPage, authOnly: true },
  { id: "5", path: Routes.TRIP_ACCESS, element: TripAccessPage, authOnly: true },
  { id: "6", path: Routes.HOME, element: Home, authOnly: true },
  { id: "7", path: Routes.NOT_FOUND, element: NotFound },
];
