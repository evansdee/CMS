/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../ui/Input";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Select from "../../../ui/Select";
import { useSession } from "../Session/useSession";
import Button from "../../../ui/Button";

export default function EditLocalEnrollment({
  enroll = {},
  setEnroll,
  onCloseModal,
}) {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: enroll,
  });

  const { data } = useSession();
  const activeSession = data?.filter((ele) => ele.active);

  const selectedCode = watch("courseName");

  useEffect(() => {
    const x = data?.find((ele) => ele.courseName.includes(selectedCode));
    if (x) {
      setValue("codeAlt", x.codeAlt);
      setValue("courseCode", x.courseCode);
      setValue("newAmount", x.newAmount);
      setValue("renewAmount", x.renewAmount);
    }
  }, [selectedCode, data, setValue]);

  function onSubmit(data) {

    const x = data.fullName.split(' ')
    const [firstName,middleName,lastName] = x
    setEnroll((p) =>
      p.map((ele) =>
        ele.gsm === data.gsm
          ? {
              ...ele,
              fullName: data.fullName,
              courseName: data.courseName,
              codeAlt: data.codeAlt,
              courseCode:data.courseCode,
              firstName,middleName,lastName,
              amount: data.isRenewal ? data.renewAmount : data.newAmount
            }
          : ele
      )
    );
    onCloseModal?.();
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Full Name">
          <Input {...register("fullName")} />
        </FormRow>
        <FormRow label="Select Course">
          <Select {...register("courseName")}>
            {activeSession?.map((ele) => (
              <option key={ele.id} value={ele.courseName}>
                {ele.courseName}
              </option>
            ))}
          </Select>
        </FormRow>
        <FormRow>
          <Input {...register("courseCode")} hidden />
          <Input {...register("codeAlt")} hidden />
          <Input type="text" {...register("newAmount")} hidden />
          <Input type="text" {...register("renewAmount")} hidden />
        </FormRow>
        <Button>Edit Enrollment</Button>
      </Form>
    </>
  );
}
