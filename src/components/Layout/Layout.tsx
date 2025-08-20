import type { FC } from "react";

type PropsLayout = {
  children: React.ReactNode;
};

export const Layout: FC<PropsLayout> = ({ children }) => {
  return <div className="mx-auto">{children}</div>;
};
