/* eslint-disable react/prop-types */
import { useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import QRCode from 'qrcode.react';

const CertificateContainer = styled.div`
  position: relative;
  width: 7.9in; /* Adjusted width to fit within A4 */
  height: 11.2in; /* Adjusted height to maintain aspect ratio and fit A4 */
  background-image: url("https://qtubihsbqxewhrenphaz.supabase.co/storage/v1/object/public/asset/ert.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
  /* padding: 20mm; */
  box-sizing: border-box;

  @media print {
    width: 100%;
    /* height: auto; */
    background-size: contain;
    page-break-inside: avoid; /* Prevent page breaks inside the certificate */
  }
`;

const TextOverlay = styled.div`
  position: absolute;
  font-size: 12pt;
  font-family: "Times New Roman", Times, serif;
  color: #000;

  &.certNo {
    top: 340px;
    left: 100px;
  }

  &.name {
    top: 380px;
    left: 300px;
  }

  &.nationality {
    top: 420px;
    right: 100px;
  }

  &.dateOfBirth {
    top: 460px;
    left: 300px;
  }

  &.dateOfIssue {
    top: 500px;
    right: 100px;
  }

  /* Add more classes for other fields as needed */
`;
const QROverlay = styled.div`
  position: absolute;
`;

const Certificate = ({
  certNo = "love",
  name = "nuvei",
  nationality = "nigeria",
  dateOfBirth = "nigga",
  dateOfIssue = "12/33/344",
  isSig=false
}) => {
  const [positions, setPositions] = useState({
    certNo: { x: 100, y: 340 },
    name: { x: 300, y: 380 },
    nationality: { x: 400, y: 420 },
    dateOfBirth: { x: 300, y: 460 },
    dateOfIssue: { x: 400, y: 500 },
    qrCode: { x: 600, y: 800 },
    isSig: { x: 500, y: 400 },
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
        <TextOverlay>{certNo}</TextOverlay>
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
          <QRCode value={qrCodeUrl} size={100} />
        </QROverlay>
      </Draggable>
    </CertificateContainer>
  );
};

export default Certificate;
