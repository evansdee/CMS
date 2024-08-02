/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const inputStyle = css`
  padding: 0.5em;
  width: 100%;
  outline: none;
  border: 1px solid #28282b;
  border-radius: 6px;
  margin: 1em 0;
`;

const StyledInput = styled.input`
  ${inputStyle}
`;

const TextArea = styled.textarea`
  ${inputStyle}
`;

export default function InputField({
  type = "text",
  value,
  placeholder,
  textArea,
  cols,
  rows,
  onChange,
  disabled
}) {
  if (textArea)
    return (
      <TextArea
        value={value}
        placeholder={placeholder}
        cols={cols}
        rows={rows}
      ></TextArea>
    );
  return (
    <>
      <StyledInput type={type} disabled={disabled} value={value} placeholder={placeholder} onChange={onChange}/>
    </>
  );
}
