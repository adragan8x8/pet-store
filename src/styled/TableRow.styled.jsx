import styled from "styled-components";

export const TableRow = styled.tr`
  background-color: ${({ highlighted }) => {
    return highlighted ? "aliceblue" : "transparent";
  }};
`;
