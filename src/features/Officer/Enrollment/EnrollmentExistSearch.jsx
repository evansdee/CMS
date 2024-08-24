import {} from "react";
import Input from "../../../ui/Input";
import FormRow from "../../../ui/FormRow";

export default function EnrollmentExistSearch({ search, setSearch }) {
  return (
    <FormRow label="Enroll Existing Student">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by Full Name(min char. of 5)"
      />
    </FormRow>
  );
}
