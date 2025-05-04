import { ReactNode } from "react";

const authLayout = ({ children }: { children: ReactNode }) => {
  return <div className="auth-layout">{children}</div>;
};

export default authLayout;
