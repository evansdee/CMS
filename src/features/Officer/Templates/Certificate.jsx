/* eslint-disable react/prop-types */
import { useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import QRCode from "qrcode.react";
import { format, parse, parseISO } from "date-fns";
import { family } from "../../../helper/data";

const CertificateContainer = styled.div`
  position: relative;
  width: 8.07in; /* A4 width in inches */
  height: ${(prop) =>
    prop.size === "short" ? "5.445in" : "11.69in"}; /* A4 height in inches */
  background-image: url(${(prop) => `${prop.certImg}`});
  background-size: contain;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
  box-sizing: border-box;
  @media print {
    max-width: 100%;
    background-size: contain;
    page-break-inside: avoid;
    /* margin: 0 5em; */
  }
`;

const TextOverlay = styled.div`
  position: absolute;
  /* font-family: sans-serif, Times, serif; */
  color: #000;
  cursor: move;
  font-size: ${(prop) => `${prop.size}px`};

  &.certNo {
    font-family: ${(prop) => `"${prop.fm.otherFamily}",sanserif`};
  }

  &.name {
    font-family: ${(prop) => `"${prop.fm.mainFamily}",sanserif`};
    border-bottom: 3px ${(prop) => (prop.fm.id === "EDH" ? "dotted" : "solid")}
      #28282b;
    padding: 0;
    line-height: 0.7em;
    text-transform: upperCase;
  }
  &.endDate,
  &.startDate {
    font-family: ${(prop) => `"${prop.fm.otherFamily}",sanserif`};
  }
  &.doi {
    font-family: ${(prop) => `"${prop.fm.normal}",sanserif`};
  }
  &.dob {
    font-family: ${(prop) => `"${prop.fm.otherFamily}",sanserif`};
  }
  &.country {
    font-family: ${(prop) => `"${prop.fm.otherFamily}",sanserif`};
  }
`;

const Img = styled.div`
  position: absolute;
  cursor: move;
`;

const QROverlay = styled.div`
  position: absolute;
  cursor: move;
`;

const Certificate = ({ state, cert, data }) => {
  const { certImg, size } = cert;
  // console.log(cert);
  const qrCodeUrl = `https://verification.joemarineng.com/${data.id}`;
  console.log(data);

  const fm = family.find(
    (ele) =>
      ele.id === data.courseCode || {
        // id:'MOTM',
        mainFamily: "BRITANIC",
        otherFamily: "Cindybob",
        normal: "Arial",
      }
  );
  const fields = [
    {
      key: "certNo",
      text: data.certificateNo,
      fontSize: state.certNo,
      position: size === "short" ? { x: 106, y: 384 } : { x: 400, y: 400 },
    },
    {
      key: "name",
      text: data.fullName,
      fontSize: state.name,
      position: size === "short" ? { x: 207, y: 217 } : { x: 100, y: 100 },
    },
    {
      key: "country",
      text: data.country,
      fontSize: state.country,
      position: { x: 0, y: 40 },
    },
    {
      key: "dob",
      text: data.dob,
      fontSize: state.dob,
      position: { x: 0, y: 60 },
    },
    {
      key: "doi",
      text: format(
        parse(data.enrollDate, "dd MMMM yy, hh:mm a", new Date()),
        "dd MMM yyyy"
      ),
      fontSize: state.doi,
      position: size === "short" ? { x: 656, y: 479 } : { x: 0, y: 20 },
    },
    {
      key: "startDate",
      text: format(parseISO(data.startDate), "dd MMM yy"),
      fontSize: state.fromToDate,
      position: size === "short" ? { x: 404, y: 393 } : { x: 0, y: 20 },
    },
    {
      key: "endDate",
      text: format(parseISO(data.endDate), "dd MMM yy"),
      fontSize: state.fromToDate,
      position: size === "short" ? { x: 539, y: 393 } : { x: 0, y: 20 },
    },
    {
      key: "isSignature",
      text: data.isSignature && "Signature",
      fontSize: state.isSignature,
      position: { x: 0, y: 220 },
    },
  ];

  const [positions, setPositions] = useState(() =>
    fields.reduce((acc, field) => {
      acc[field.key] = field.position;
      return acc;
    }, {})
  );
  const handleDrag = (e, data, key) => {
    setPositions((prev) => ({
      ...prev,
      [key]: { x: data.x, y: data.y },
    }));
  };

  return (
    <CertificateContainer certImg={certImg} size={size}>
      {fields.map(({ key, text, fontSize }) => (
        <Draggable
          key={key}
          position={positions[key]}
          onStop={(e, data) => handleDrag(e, data, key)}
        >
          <TextOverlay className={key} size={fontSize} fm={fm}>
            {text}
          </TextOverlay>
        </Draggable>
      ))}
      <Draggable
        position={positions.photo}
        onStop={(e, data) => handleDrag(e, data, "photo")}
      >
        <Img>
          <img
            src={data.photo}
            alt="Certificate Photo"
            style={{ width: `${state.img}%`, cursor: "move" }}
          />
        </Img>
      </Draggable>
      <Draggable
        position={positions.qrCode}
        onStop={(e, data) => handleDrag(e, data, "qrCode")}
      >
        <QROverlay>
          <QRCode value={qrCodeUrl} size={parseInt(state.qrCode)} />
        </QROverlay>
      </Draggable>
    </CertificateContainer>
  );
};

export default Certificate;
