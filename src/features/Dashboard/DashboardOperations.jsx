import {} from "react";
import Filter from "../../ui/Filter";

export default function DashboardOperations() {

    // console.log(active)
  return (
    <>
        <Filter
          filterField={"last"}
          options={[
            { value: "7", label: "Last 7 days" },
            { value: "30", label: "Last 30 days" },
            { value: "60", label: "Last 60 days" },
          ]}
        />
    </>
  );
}
