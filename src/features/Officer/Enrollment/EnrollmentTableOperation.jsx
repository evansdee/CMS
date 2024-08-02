import Filter from "../../../ui/Filter";
import TableOperations from "../../../ui/TableOperations";

export default function EnrollmentTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField={"enrollment"}
        options={[
          { value: "list", label: "Enrollment List" },
          { value: "form", label: "Enrollment Form" },
          { value: "nil", label: "With-discount" },
        ]}
      />
    </TableOperations>
  );
}
