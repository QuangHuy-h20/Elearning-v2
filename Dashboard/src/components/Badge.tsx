import styled from "@emotion/styled";
import { ComponentProps } from "react";

const StyledBadge = styled.div`
  .badge {
    padding: 6px 11px;
    color: #000;
    border-radius: 10px;
    box-shadow: var(--box-shadow);
  }

  .badge-new {
    background-color: var(--main-color-green);
  }

  .badge-bsl {
    background-color: var(--main-color-yellow);
  }
`;

const Badge = (props: ComponentProps<any>) => {
  return (
    <StyledBadge>
      {props.view >= 50 ? <span className="badge badge-bsl">Best seller</span> : <span className="badge badge-new">New</span>}
      
    </StyledBadge>
  );
};

export default Badge;
