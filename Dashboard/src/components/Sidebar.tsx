import sidebar_items from "../utils/sidebar-items.json";
import NextLink from "next/link";
import { useRouter } from "next/dist/client/router";
import { ComponentProps } from "react";
import styled from "@emotion/styled";
import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";

const StyledSidebar = styled.div`
  min-width: var(--sidebar-width);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: var(--main-bg);
  box-shadow: var(--box-shadow);

  .sidebar__logo {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    & > img {
      height: 45px;
    }
  }

  .sidebar__item {
    padding: 0 20px;
  }

  .sidebar__item-inner {
    padding: 15px 25px;
    display: flex;
    align-items: center;
    font-weight: 600;
    transition: color 0.3s ease 0s;
    & > i {
      margin-right: 10px;
      font-size: 1.5rem;
    }
    & > span {
      text-transform: capitalize;
    }

    &:hover {
      color: var(--main-color);
    }

    

    &.active {
      border-radius: var(--border-radius);
      background-image: linear-gradient(
        to right,
        var(--main-color),
        var(--second-color)
      );
      color: var(--txt-white);
    }
  }
`;

const SidebarItem = (props: ComponentProps<any>) => {
  const active = props.active ? "active" : "";
  return (
    <>
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.name}</span>
      </div>
    </>
  );
};

const Sidebar = () => {
  const router = useRouter();

  const { data: meData } = useMeQuery();

  const [logout] = useLogoutMutation();

  const logoutUser = async () => {
    await logout({
      update(cache, { data }) {
        if (data?.logout) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: { me: null },
          });
        }
      },
    });

    router.push("/login");
  };

  const activeItem = sidebar_items.findIndex(
    (item) => item.route === router.pathname
  );

  return (
    <StyledSidebar>
      <div className="sidebar__logo">
        <a className="text-2xl" href="/">Traveller</a>
      </div>

      {sidebar_items.map((item, index) => (
        <NextLink href={item.route} key={index}>
          <a>
            <SidebarItem
              icon={item.icon}
              name={item.displayName}
              active={index === activeItem}
            />
          </a>
        </NextLink>
      ))}
      {meData?.me ? (
        <a className="sidebar__item-inner">
          <i className="bx bx-log-out hover:text-red-400"></i>
          <button onClick={logoutUser}>
            <span className="text-red-400 font-bold">Logout</span>
          </button>
        </a>
      ) : null}
    </StyledSidebar>
  );
};

export default Sidebar;
