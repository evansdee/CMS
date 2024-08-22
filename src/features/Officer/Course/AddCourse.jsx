import {} from "react";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import { useForm } from "react-hook-form";
import FileInput from "../../../ui/FileInput";
import Button from "../../../ui/Button";
import { useAddCourse } from "../Enrollment/useCourse";
import SpinnerMini from "../../../ui/SpinnerMini";
import Select from "../../../ui/Select";
import ErrorFallback from "../../../ui/ErrorFallback";

export default function AddCourse({ onCloseModal }) {
  const { mutate, isPending,error } = useAddCourse();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      courseName: "HELMS",
      courseCode: "HELMS",
      codeAlt: "419",
      newAmount: 34560,
      renewAmount: 98760,
      size: "long",
    },
  });
  const { errors } = formState;
  if (error) return <ErrorFallback error={error} />;


  function onSubmit(data) {
    const newCourse = {
      ...data,
      newAmount: parseInt(data.newAmount),
      renewAmount: parseInt(data.renewAmount),
      count: parseInt(data.count),
      isApproved: false,
      certImg: data.certImg[0],
    };
    console.log(newCourse);

    mutate(newCourse, { onSuccess: () => onCloseModal?.() });
    // onCloseModal?.()
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Certificate Template">
        <FileInput
          type="file"
          accept="image/*"
          {...register("certImg", { required: "Image needed" })}
          error={errors?.certImg?.message}
        />
      </FormRow>
      <FormRow label="Course Name" error={errors?.courseName?.message}>
        <Input
          {...register("courseName", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Course Code" error={errors?.courseCode?.message}>
        <Input
          {...register("courseCode", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Code Alternative" error={errors?.codeAlt?.message}>
        <Input
          {...register("codeAlt", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Count" error={errors?.count?.message}>
        <Input
          {...register("count", {
            required: "This field is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Only numbers are allowed",
            },
          })}
        />
      </FormRow>
      <FormRow label="Fee" error={errors?.newAmount?.message}>
        <Input
          {...register("newAmount", {
            required: "This field is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Only numbers are allowed",
            },
          })}
        />
      </FormRow>
      <FormRow label="Renewal Fee" error={errors?.renewAmount?.message}>
        <Input
          {...register("renewAmount", {
            required: "This field is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Only numbers are allowed",
            },
          })}
        />
      </FormRow>

      <FormRow label="Size">
        <Select {...register("size", { required: "This field is required" })}>
          <option value="short">Short</option>
          <option value="long">Long</option>
        </Select>
      </FormRow>
      <br />
      <Button>{isPending ? <SpinnerMini /> : "Add Course"}</Button>
    </Form>
  );
}
