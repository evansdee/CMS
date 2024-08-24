import Filter from "../../../ui/Filter";
import TableOperations from "../../../ui/TableOperations";

export default function EnrollmentTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField={"enrollment"}
        options={[
          { value: "list", label: "Enrollment List" },
          { value: "form", label: "Enroll New Student" },
          { value: "exist", label: "Enroll Existing Student" },
        ]}
      />
    </TableOperations>
  );
}
