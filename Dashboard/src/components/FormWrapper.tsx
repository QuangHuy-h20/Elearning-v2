import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width:450px;
  margin: 100px auto 0;
`;

interface IFormWrapperProps {
  children: ReactNode;
}

const FormWrapper = ({ children }: IFormWrapperProps) => {
  return <StyledForm>{children}</StyledForm>;
};

export default FormWrapper;
