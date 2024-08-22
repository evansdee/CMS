import { useEffect,useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-icon);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-icon);
    color: var(--color-brand-50);
  }
`;

export default function CertificateOperations({activeBtn, setActive}) {
  const navigate = useNavigate();

  const location = useLocation()

  // console.log(location)

  useEffect(()=>{
    if(location.pathname.includes('list')) setActive(true)
    if(location.pathname.includes('search')) setActive(false)
  },[location.pathname])

  function handleClick(value, url) {
    setActive(value);
    navigate(`/dashboard/certificate/${url}`);
  }

  return (
    <ButtonGroup>
      <FilterButton
        id="enrollmentList"
        active={activeBtn}
        onClick={() => handleClick(true, "list")}
      >
        Certificate List
      </FilterButton>
      <FilterButton
        id="enrollmentForm"
        active={!activeBtn}
        onClick={() => handleClick(false, "search")}
      >
        Certificate Search
      </FilterButton>
    </ButtonGroup>
  );
}
