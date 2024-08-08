import styled from "styled-components";
import { useEffect, useState } from "react";
import supabase from "../service/supabase";

const newData = [
  {
    age: "1",
  },
  {
    age: "2",
  },
  {
    age: "3",
  },
  {
    age: "4",
  },
  {
    age: "5",
  },
];

export default function Test() {
  const [updateStatus, setUpdateStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateEnrollment = async () => {

      setLoading(true);
      const updateData = await Promise.all(

      newData.map(async obj=>{

        const { data, error } = await supabase
        .from("enrolled")
        .insert(newData)
        
        if (error) {
          setError(error.message);
        } else {
          setUpdateStatus(data);
        }
        setLoading(false);
      })
      )
    }

   
      updateEnrollment();
  
  }, [ ]);

  return (
    <>
      <button>update</button>
    </>
  );
}
