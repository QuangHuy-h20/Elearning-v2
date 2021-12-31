import styled from "@emotion/styled";
import { useMeQuery } from "../generated/graphql";
import Dropdown from "./Dropdown";

export interface IItemProps {
  icon: string;
  content: string;
}

const StyledNavbar = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--topnav-height);

  .topnav__search {
    position: relative;
    height: 50px;
    background-color: var(--main-bg);
    display: flex;
    align-items: center;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    overflow: hidden;

    & > input {
      height: 100%;
      width: 100%;
      padding: 10px 60px 10px 20px;
      font-size: 1rem;
      border-radius: var(--border-radius);
      color: var(--txt-color);
      background-color: var(--main-bg);
    }

    & > i {
      font-size: 1.5rem;
      position: absolute;
      right: 20px;
    }
  }

  .topnav__right {
    display: flex;
    align-items: center;

    .topnav__right-item ~ .topnav__right-item {
      margin-left: 30px;
    }

    .notification-item {
      display: flex;
      align-items: center;
      padding: 20px;
      &:hover {
        background-color: var(--second-bg);
      }
      & > i {
        margin-right: 20px;
        font-size: 1.5rem;
      }
    }

    .topnav__right-user {
      display: flex;
      align-items: center;
    }

    .topnav__right-user__image {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;

      & > img {
        width: 100%;
      }
    }

    .topnav__right-user__name {
      font-size: 1rem;
      font-weight: 600;
    }
  }
`;

const Navbar = () => {

  const {data:meData} = useMeQuery();

  return (
    <StyledNavbar>
      <div className="topnav__search">
        <input type="search" placeholder="Search" />
        <i className="bx bx-search"></i>
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          {meData?.me ? <span className="text-indigo-400">{`Hello, ${meData.me.username}`}</span> : null}
        </div>
        <div className="topnav__right-item mt-2">
          <Dropdown icon="bx bx-bell" badge="2" />
        </div>
        <div className="topnav__right-item">
          <Dropdown />
        </div>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
