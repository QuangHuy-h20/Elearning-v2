import styled from "@emotion/styled";
import { ComponentProps } from "react";
import { IItemProps } from "./Navbar";

const StyledDropdown = styled.div`
  position: relative;
  z-index: 99;

  .dropdown__toggle {
    border: 0;
    outline: 0;
    background-color: transparent;
    position: relative;
    & > i {
      font-size: 1.4rem;
      color: var(--txt-color);
    }

    .dropdown__content {
      position: absolute;
      top: calc(100% + 5px);
      right: 0;
      width: max-content;
      max-width: 400px;
      background-color: vaR(--main-bg);
      box-shadow: var(--box-shadow);
      border-radius: var(--border-radius);
      overflow: hidden;
      transform-origin: top right;
      transform: scale(0);
      transition: transform 0.3s ease 0s;
      &.active{
        transform: scale(1);
        transition: transform 0.5s var(--transition-cubic);
      }
    }

    .dropdown__toggle-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -10px;
      right: -4px;
      height: 1.2rem;
      width: 1.2rem;
      border-radius: 50%;
      background-color: var(--main-color);
      color: var(--txt-white);
      font-size: 0.8rem;
    }
  }

  .dropdown__footer {
    padding: 20px;
    text-align: center;
  }
`;

const Dropdown = (props: ComponentProps<any>) => {
  return (
    <StyledDropdown>
      <button className="dropdown__toggle">
        {props.icon ? <i className={props.icon}></i> : ""}
        {props.badge ? (
          <span className="dropdown__toggle-badge">{props.badge}</span>
        ) : (
          ""
        )}
        {props.customToggle ? props.customToggle() : ""}
      </button>
      <div className="dropdown__content">
        {props.contentData && props.renderItems
          ? props.contentData.map((item: IItemProps, index: number) =>
              props.renderItems(item, index)
            )
          : ""}
        {props.renderFooter ? (
          <div className="dropdown__footer">{props.renderFooter()}</div>
        ) : (
          ""
        )}
      </div>
    </StyledDropdown>
  );
};

export default Dropdown;
