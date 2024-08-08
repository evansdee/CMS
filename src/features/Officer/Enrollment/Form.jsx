/* eslint-disable react/prop-types */
import styled from "styled-components";
import { createContext } from "react";

const StyledForm = styled.form`
  display: grid;
  grid-template-rows: repeat(5, auto);
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  overflow: hidden;

  > div {
    padding: 0 1em;
  }

  @media (max-width: 768px) {
    padding: 1.6rem 2rem; /* Adjust padding for mobile */
    grid-template-rows: repeat(5, auto); /* Adjust row count if needed */
  }
`;

// Common row styling
const CommonRow = styled.div`
  display: grid;
  margin: 1em 0;
  gap: 1.5em;

  @media (max-width: 768px) {
    gap: 1em; 
  }
`;

// Multiple column row styling
const StyledFormMultiple = styled(CommonRow)`
  grid-template-columns: ${props => `repeat(${props.len}, 1fr)`};

  @media (max-width: 768px) {
    grid-template-columns: 1fr; 
  }
`;

// Single column row styling
const StyledFormSingle = styled(CommonRow)`
  grid-template-columns: 1fr;


`;

const FormContext = createContext();
export default function Form({ children, onSubmit }) {
  return (
    <FormContext.Provider value={{}}>
      <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
    </FormContext.Provider>
  );
}

function FormMultipleRow({ children }) {
  return <StyledFormMultiple len={children.length}>{children}</StyledFormMultiple>;
}
function FormSingleRow({ children }) {
  return <StyledFormSingle>{children}</StyledFormSingle>;
}

Form.FormMultipleRow = FormMultipleRow;
Form.FormSingleRow = FormSingleRow;
