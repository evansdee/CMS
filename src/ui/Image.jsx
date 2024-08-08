/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledImage = styled.img`
  width: ${(props) => props.width || "75%"};
  height: ${(props) => props.height || "auto"};
`;

const Image = ({ src, alt, width, height }) => {
  return <StyledImage src={src} alt={alt} width={width} height={height} />;
};

export default Image;
