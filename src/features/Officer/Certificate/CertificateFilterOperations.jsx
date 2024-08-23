import {} from "react";
import Filter from "../../../ui/Filter";

export default function CertificateFilterOperations({ active }) {

    // console.log(active)
  return (
    <>
      {active && (
        <Filter
          filterField={"date"}
          options={[
            { value: "today", label: "Today" },
            { value: "3", label: "Last 3 days" },
            { value: "7", label: "Last 7 days" },
          ]}
        />
      )}
    </>
  );
}
