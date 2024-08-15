import { useEffect,useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 5px 8px;
  border-radius: 8px;
  border: 1px solid var(--color-grey-0);
  background-color: ${({ active }) =>
    active ? "var(--color-icon)" : "var(--color-grey-0)"};
  color: ${({ active }) =>
    active ? "var(--color-grey-50)" : "var(--color-grey-700)"};
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${({ active }) =>
      active ? "var(--color-icon)" : "#f5f5f5"};
  }
`;

export default function CertificateOperations() {
  const navigate = useNavigate();

  const [activeBtn, setActive] = useState(true);
  const location = useLocation()

  // console.log(location)

  useEffect(()=>{
    if(location.pathname.includes('list')) setActive(true)
    else setActive(false)
  },[location.pathname])

  function handleClick(value, url) {
    setActive(value);
    navigate(`/dashboard/certificate/${url}`);
  }

  return (
    <ButtonGroup>
      <Button
        id="enrollmentList"
        active={activeBtn}
        onClick={() => handleClick(true, "list")}
      >
        Certificate List
      </Button>
      <Button
        id="enrollmentForm"
        active={!activeBtn}
        onClick={() => handleClick(false, "search")}
      >
        Certificate Search
      </Button>
    </ButtonGroup>
  );
}
