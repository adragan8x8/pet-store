import styled from "styled-components";

export const SubmitButtonSecondary = styled.button`
  font-size: 14px;
  font-weight: bold;
  background-color: #fff;
  color: #333;
  padding: 8px 16px;
  text-align: center;
  border: 2px solid #333;
  border-radius: 8px;
  margin: 16px 8px;
  cursor: pointer;

  &:disabled {
    background-color: grey;
  }
`;
