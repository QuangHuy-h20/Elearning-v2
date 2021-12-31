import { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styled from "@emotion/styled";
import { useCheckAuth } from "../utils/useCheckAuth";

interface ILayoutProps {
  children: ReactNode;
}

const StyledLayout = styled.div`
  color: var(--txt-color);
  .layout__content {
    padding-left: var(--sidebar-width);
    background-color: var(--second-bg);
    min-height: 100vh;
  }
  .layout__content-main {
    padding: 30px;
  }
`;

const Layout = ({ children }: ILayoutProps) => {
  const { data: authData, loading: authLoading } = useCheckAuth();

  if (authLoading && !authData?.me) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full inline border-4 border-t-4 border-gray-200 h-16 w-16 "></div>
      </div>
    );
  } else {
    return (
      <StyledLayout>
        <Sidebar />
        <div className="layout__content">
          <Navbar />
          <div className="layout__content-main">{children}</div>
        </div>
      </StyledLayout>
    );
  }
};

export default Layout;
