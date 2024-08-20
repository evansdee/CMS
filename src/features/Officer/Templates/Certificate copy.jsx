/* eslint-disable react/prop-types */
import { useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import QRCode from "qrcode.react";

const CertificateContainer = styled.div`
  position: relative;
  width: 8.27in; /* A4 width in inches */
  height: 11.69in; /* A4 height in inches  divide by 2 for smaller certdd*/
  /* background-image: url('../asset/'); */
  background-image: url(${(prop) => `${prop.img}`});
  background-size: contain; /* Ensure the image covers the entire container */
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
  box-sizing: border-box;

  @media print {
    max-width: 100%;
    background-size: contain; /* Ensure the image covers the entire container in print mode */
    page-break-inside: avoid; /* Prevent page breaks inside the certificate */
  }
`;

const TextOverlay = styled.div`
  position: absolute;
  /* font-size: 12pt; */
  font-family: "Times New Roman", Times, serif;
  color: #000;
  cursor: move;

  &.certNo {
    /* top: 340px;
    left: 100px; */
    font-size: ${(prop) => `${prop.cert}px`};
  }

  &.name {
    font-size: ${(prop) => `${prop.size}px`};
    
  }

  &.country {
    font-size: ${(prop) => `${prop.size}px`};
   
  }

  &.dob {
    font-size: ${(prop) => `${prop.size}px`};
  
  }

  &.doi {
    font-size: ${(prop) => `${prop.size}px`};
   
  }
  &.fromToDate{
    font-size: ${(prop) => `${prop.size}px`};

  }
  &.photo{
    font-size: ${(prop) => `${prop.size}px`};

  }
  /* Add more classes for other fields as needed */
`;
const QROverlay = styled.div`
  position: absolute;
  cursor: move;
`;


const Certificate = ({ state, cert, data }) => {
  /* map though the data using object.keys so you have to chagne the names obviously
   */
  const {
    certificateNo,
    fullName,
    dob,
    startDate,
    endDate,
    enrollDate,
    country,
    isSignature,
  } = data;
  const { certImg, size } = cert;
  const {
    qrCode: qr,
    certNo: certFont,
    name: nameFont,
    country: countryFont,
    dob:dobFont,
    doi:doiFont,
    fromToDate
  } = state;

  // console.log(typeof qr);
  const [positions, setPositions] = useState({
    certNo: { x: 0, y: 170 },
    name: { x: 0, y: 20 },
    country: { x: 0, y: 40 },
    dob: { x: 0, y: 60 },
    doi: { x: 0, y: 80 },
    startDate: { x: 0, y: 100 },
    endDate: { x: 0, y: 120 },
    qrCode: { x: 0, y: 150 },
    isSignature: { x: 0, y: 220 },
  });

  const handleDrag = (e, data, key) => {
    setPositions((prev) => ({
      ...prev,
      [key]: { x: data.x, y: data.y },
    }));
  };
  const qrCodeUrl = `https://verification.joemarineng.com/${certificateNo}`;

  return (
    <CertificateContainer img={certImg} size={size}>
      <Draggable
        position={positions.certNo}
        onStop={(e, data) => handleDrag(e, data, "certNo")}
      >
        <TextOverlay cert={certFont} className="certNo">
          {certificateNo}
        </TextOverlay>
      </Draggable>

      <Draggable
        position={positions.name}
        onStop={(e, data) => handleDrag(e, data, "name")}
      >
        <TextOverlay className="name" size={nameFont}>{fullName}</TextOverlay>
      </Draggable>

      <Draggable
        position={positions.country}
        onStop={(e, data) => handleDrag(e, data, "country")}
      >
        <TextOverlay className="country" size={countryFont}>{country}</TextOverlay>
      </Draggable>

      <Draggable
        position={positions.dob}
        onStop={(e, data) => handleDrag(e, data, "dob")}
      >
        <TextOverlay className="dob" size={dobFont}>{dob}</TextOverlay>
      </Draggable>

      <Draggable
        position={positions.doi}
        onStop={(e, data) => handleDrag(e, data, "doi")}
      >
        <TextOverlay className="doi" size={doiFont}>{enrollDate}</TextOverlay>
      </Draggable>
      <Draggable
        position={positions.startDate}
        onStop={(e, data) => handleDrag(e, data, "startDate")}
      >
        <TextOverlay className="fromToDate" size={fromToDate}>{startDate}</TextOverlay>
      </Draggable>
      <Draggable
        position={positions.endDate}
        onStop={(e, data) => handleDrag(e, data, "endDate")}
      >
        <TextOverlay className="fromToDate" size={fromToDate}>{endDate}</TextOverlay>
      </Draggable>
      <Draggable
        position={positions.isSignature}
        onStop={(e, data) => handleDrag(e, data, "isSignature")}
      >
        <TextOverlay>{isSignature && "Signature"}</TextOverlay>
      </Draggable>
      <Draggable
        position={positions.qrCode}
        onStop={(e, data) => handleDrag(e, data, "qrCode")}
      >
        <QROverlay
        //   style={{ left: positions.qrCode.x, top: positions.qrCode.y }}
        >
          <QRCode value={qrCodeUrl} size={parseInt(qr)} />
        </QROverlay>
      </Draggable>
    </CertificateContainer>
  );
};

export default Certificate;
