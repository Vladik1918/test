import { BrowserRouter, Route, Routes as RR } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import { routes } from "./router";
import type { IRoute } from "./router";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <RR>
        {routes.map(({ authOnly, element: Component, isIndex, ...route }: IRoute) => {
          const routeProps = {
            ...route,
            element: authOnly ? (
              <Layout>
                <Component />
              </Layout>
            ) : (
              <Component />
            ),
          };

          if (isIndex) {
            return <Route key={route.id} {...routeProps} index />;
          }

          return <Route key={route.id} {...routeProps} />;
        })}
      </RR>
    </BrowserRouter>
  );
};
