/* eslint-disable react/prop-types */
import { useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import QRCode from 'qrcode.react';

const CertificateContainer = styled.div`
  position: relative;
  width: 8.27in; /* A4 width in inches */
  height: 11.69in; /* A4 height in inches  divide by 2 for smaller certdd*/
  /* background-image: url('../asset/'); */
  background-image: url("https://qtubihsbqxewhrenphaz.supabase.co/storage/v1/object/public/certificates/STCW.png");
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
    font-size: ${prop=>`${prop.cert}px`};
  }

  &.name {
    /* top: 0;
    left: 0; */
  }

  &.nationality {
    /* top: 420px;
    right: 100px; */
  }

  &.dateOfBirth {
    /* top: 460px;
    left: 300px; */
  }

  &.dateOfIssue {
    /* top: 500px;
    right: 100px; */
  }

  /* Add more classes for other fields as needed */
`;
const QROverlay = styled.div`
  position: absolute;
  cursor: move;
`;

const Certificate = ({
  certNo = "love",
  name = "nuvei",
  nationality = "nigeria",
  dateOfBirth = "nigga",
  dateOfIssue = "12/33/344",
  isSig=false,
  state
}) => {

   /* map though the data using object.keys so you have to chagne the names obviously
   */
  const {certNo:cert,qrCode:qr} = state

  console.log(typeof(qr))
  const [positions, setPositions] = useState({
    certNo: { x: 0, y: 100 },
    name: { x: 0, y: 20 },
    nationality: { x: 0, y: 40 },
    dateOfBirth: { x: 0, y: 60 },
    dateOfIssue: { x: 0, y: 80 },
    qrCode: { x: 0, y: 150 },
    isSig: { x: 0, y: 220 },
  });

  const handleDrag = (e, data, key) => {
    setPositions((prev) => ({
      ...prev,
      [key]: { x: data.x, y: data.y },
    }));
  };
  const qrCodeUrl = `https://verification.joemarineng.com/${certNo}`;

  return (
    <CertificateContainer>
      <Draggable
        position={positions.certNo}
        onStop={(e, data) => handleDrag(e, data, "certNo")}
      >
        <TextOverlay cert={cert} className='certNo'>{certNo}</TextOverlay>
      </Draggable>

      <Draggable
        position={positions.name}
        onStop={(e, data) => handleDrag(e, data, "name")}
      >
        <TextOverlay>{name}</TextOverlay>
      </Draggable>

      <Draggable
        position={positions.nationality}
        onStop={(e, data) => handleDrag(e, data, "nationality")}
      >
        <TextOverlay>{nationality}</TextOverlay>
      </Draggable>

      <Draggable
        position={positions.dateOfBirth}
        onStop={(e, data) => handleDrag(e, data, "dateOfBirth")}
      >
        <TextOverlay>{dateOfBirth}</TextOverlay>
      </Draggable>

      <Draggable
        position={positions.dateOfIssue}
        onStop={(e, data) => handleDrag(e, data, "dateOfIssue")}
      >
        <TextOverlay>{dateOfIssue}</TextOverlay>
      </Draggable>
      <Draggable
        position={positions.isSig}
        onStop={(e, data) => handleDrag(e, data, "isSig")}
      >
        <TextOverlay>{isSig && 'Signature'}</TextOverlay>
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
