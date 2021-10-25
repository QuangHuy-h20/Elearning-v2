import { ReactNode } from "react";
import Navbar from "./Navbar";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Navbar />
      <section className="px-56 mt-12 max-w-full h-full">{children}</section>
    </>
  );
};

export default Layout;
