/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";
import Label from "../../../ui/Label";
import Input from "../../../ui/Input";
import ButtonIcon from "../../../ui/ButtonIcon";
import { FaPrint } from "react-icons/fa";
import {FaAnchorCircleCheck,FaAnchorCircleXmark   } from "react-icons/fa6";
import Flex from "../../../ui/Flex";

const Container = styled.div`
  position: fixed;
  /* top: 5%; */
  width: 20%;
  @media print {
    display: none;
  }
`;
const Panel = styled.div`
  padding: 1em;
  background-color: var(--color-grey-300);
  border-radius: 20px;
`;
const Btn = styled(ButtonIcon)``;
export default function CertificatePanel({ state, handleInput }) {
  const [active, setActive] = useState(false);

  const { qrCode,img, ...rest } = state;
  const data = Object.keys(rest);

  return (
    <Container>
      <Flex justify="center" align="center" direction="column" gap=".5em">
        <ButtonIcon onClick={()=>window.print()} variation='danger'>
            
            <FaPrint/>
        </ButtonIcon>
        <Btn onClick={() => setActive((p) => !p)}>
          {active ? <FaAnchorCircleXmark  /> : <FaAnchorCircleCheck  />}
        </Btn>
        {active && (
          <Panel>
            {data.map((ele) => (
              <Label label={`${ele}-${state[ele]}`} key={ele}>
                <Input
                  name={ele}
                  value={state[ele]}
                  type="range"
                  min="10"
                  max="50"
                  onChange={handleInput}
                />
              </Label>
            ))}
            <Label label={`Qr Code-${qrCode}`}>
              <Input
                name="qrCode"
                value={qrCode}
                type="range"
                min="50"
                max="150"
                onChange={handleInput}
              />
            </Label>
            <Label label={`Photo-${img}`}>
              <Input
                name="img"
                value={img}
                type="range"
                min="10"
                max="100"
                onChange={handleInput}
              />
            </Label>
          </Panel>
        )}
      </Flex>
    </Container>
  );
}
