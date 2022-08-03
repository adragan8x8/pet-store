import styled from "styled-components";

export const FormFieldDiv = styled.div`
  max-width: 200px;
  margin: 8px auto;
  text-align: left;
  display: flex;
  flex-direction: column;

  label {
    margin: 8px 0;
    font-weight: bold;
  }

  input {
    padding: 8px;
    font-size: 14px;
    border-radius: 8px;
    border: 2px solid #333;
  }

  select {
    padding: 8px;
    font-size: 14px;
    border-radius: 8px;
    border: 2px solid #333;
  }
`;
