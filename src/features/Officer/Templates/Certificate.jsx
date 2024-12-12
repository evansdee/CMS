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
    prop.size === "short" ? "5.445in" : "9.69in"}; /* A4 height in inches */
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
    font-family: ${(prop) => `ARIAL,sanserif`};
    // font-family: ${(prop) => `"${prop.fm.otherFamily}",sanserif`};
  }

  &.name {
    font-family: ${(prop) => `"COLISEO-NORMAL",sanserif`};
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
        otherFamily: "elephant",
        normal: "Arial",
      }
  );
  
  const fields = [
    {
      key: "certNo",
      text: data.certificateNo,
      fontSize: state.certNo,
      position: size === "short" ? { x: 129, y: 389 } : { x: 183, y: 755 },
    },
    {
      key: "name",
      text: data.fullName,
      fontSize: state.name,
      position: size === "short" ? { x: 282, y: 481 } : { x: 262, y: 400 },
    },
    {
      key: "country",
      text: data.country,
      fontSize: state.country,
      position: { x: 800, y: 827 },
    },
    {
      key: "dob",
      text: data.dob,
      fontSize: state.dob,
      position: { x: 800, y: 827 },
    },
    {
      key: "doi",
      text:format(parseISO(data.endDate), "dd MMM yyyy"),
      fontSize: state.doi,
      position: { x: 389, y: 685 },
    },
    {
      key: "startDate",
      text: format(parseISO(data.startDate), "dd MMM yy") || "",
      fontSize: state.fromToDate,
      position: { x: 174, y: 614 },
    },
    {
      key: "endDate",
      text: format(parseISO(data.endDate), "dd MMM yy"),
      fontSize: state.fromToDate,
      position: { x: 544, y: 614 },
    },
    {
      key: "isSignature",
      text: data.isSignature && "Signature",
      fontSize: state.isSignature,
      position: { x: 800, y: 827 },
    },
    {
      key:"qrCode",
      position: { x: 800, y: 827 },
    },
    {
      key:"photo",
      position: { x: 800, y: 827 },
    }
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
