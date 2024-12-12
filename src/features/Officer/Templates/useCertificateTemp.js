import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCertificate } from "../Enrollment/useEnrollment";
import { format, parseISO } from "date-fns";




export function useCertTemp(){


    const params = useParams();
    const {
      data: {
        certificateNo,
        fullName,
        country,
        dob,
        photo,
        startDate,
        endDate,
        isSignature,
      },
    } = useCertificate(parseInt(params.id));

    const state ={
        certNo: 25,
        name: 30,
        country: 25,
        dob: 25,
        doi: 25,
        fromToDate: 25,
        qrCode: 80,
        img: 40,
      }
    const certs = [
        {
            courseCode: "ACME",
            fields: [
              {
                keys: "certNo",
                text: certificateNo,
                fontSize: state.certNo,
                position: { x: 132, y: 319 },
                size:15
              },
              {
                keys: "name",
                text: fullName,
                fontSize: state.name,
                position: { x: 314, y: 233 },
                size:30
      
              },
              {
                keys: "country",
                text: `${country}N`,
                fontSize: state.country,
                position: { x: 421, y: 357 },
                size:16
      
              },
              {
                keys: "dob",
                text: format(parseISO(dob), "dd MMM yyyy"),
                fontSize: state.dob,
                position: { x: 665, y: 396 },
                size:16
              },
              {
                keys: "doi",
                text: format(parseISO(endDate), "dd MMM yyyy"),
                fontSize: state.doi,
                position: { x: 658, y: 438 },
                size:14
      
              },
              {
                keys: "startDate",
                text: format(parseISO(startDate), "MMM yyyy"),
                fontSize: state.fromToDate,
                position: { x: 368, y: 318 },
                size:16
              },
              {
                keys: "endDate",
                text: format(parseISO(endDate), "MMM yyyy"),
                fontSize: state.fromToDate,
                position: { x: 524, y: 319 },
                size:16
      
              },
              {
                keys: "isSignature",
                text: isSignature && "Signature",
                fontSize: state.isSignature,
                position: { x: 106, y: 384 },
                size:25
      
              },
              {
                keys: "img",
                url:photo,
                alt:"ISPS CERTIFICATE",
                imgSize: state.img,
                position: { x: 658, y: 292 },
                size:.78,
                dvh:.9,
                  text:""
              },
              {
                keys: "qrCode",
               
                qrSize: state.qrCode,
                position: { x: 647, y: 106 },
                size:70,
                text:""
      
              },
            
            ],
          },
    ]

    return {certs}
}