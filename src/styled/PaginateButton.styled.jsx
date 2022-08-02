import styled from "styled-components";

export const PaginateButton = styled.button`
  padding: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: none;
  cursor: pointer;
  background-color: transparent;
  fill: ${({ disabled }) => (disabled ? "grey" : "#333")};
`;
