import styled from "styled-components";

export const FilterOption = styled.div`
  display: flex;
  margin-right: 16px;

  h3 {
    font-size: 14px !important;
  }

  input {
    width: 40px;
    font-weight: bold;
    padding: 4px 0;
    text-align: center;
    border: 2px solid #333;
    border-radius: 8px;
    margin-right: 8px;
    cursor: pointer;
  }

  select {
    width: 48px;
    font-weight: bold;
    padding: 4px 0;
    text-align: center;
    border: 2px solid #333;
    border-radius: 8px;
    margin-right: 8px;
    cursor: pointer;
  }
`;
