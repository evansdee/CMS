/* eslint-disable react/prop-types */
import Input from "../../../ui/Input";
import FormRow from "../../../ui/FormRow";
import Select from "../../../ui/Select";
import { sessArr } from "../../../helper/data";
import Button from "../../../ui/Button";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Form from "../../../ui/Form";
import SpinnerMini from "../../../ui/SpinnerMini";
import { useCreateEditSession } from "./useCreateEditSession";
import { isAfter } from "date-fns";
import { useEditSession } from "./useEditSession";

export default function CreateSessionForm({
  sessionToEdit = {},
  onCloseModal,
}) {
  const courses = sessArr.filter((ele) => ele.course);

  const { mutate, isPending: isLoading } = useCreateEditSession();
  const { editSession, isEditing } = useEditSession();

  const isWorking = isLoading || isEditing;
  const { id: editId, ...editValues } = sessionToEdit;
  const isEditSession = Boolean(editId);
  const [isChecked, setIsChecked] = useState(editValues.active);

  const { register, handleSubmit, watch, formState, setValue, reset } = useForm(
    {
      defaultValues: isEditSession
        ? editValues
        : {
            courseName: courses[0].course,
            courseCode: courses[0].code,
            startDate: "2024-08-01",
            endDate: "2024-08-05",
          },
    }
  );

  const { errors } = formState;
  const selectedCourseName = watch("courseName");

  useEffect(() => {
    const x = courses.find((ele) => ele.course.includes(selectedCourseName));
    if (x) {
      setValue("courseCode", x.code);
      setValue("codeAlt", x.codeAlt);
      setValue("newAmount", x.newAmount);
      setValue("renewAmount", x.renewAmount);
    }
  }, [courses, setValue, selectedCourseName]);

  function onSubmit(data) {
    if (isEditSession) {
      editSession(
        { newSession: { ...data, active: isChecked }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      const isActive = isAfter(data.endDate, new Date());
      mutate(
        { ...data, active: isActive },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
      console.log(data);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <Input type="text" {...register("codeAlt")} hidden />
      <Input type="text" {...register("newAmount")} hidden />
      <Input type="text" {...register("renewAmount")} hidden />
      <FormRow label="Course Code">
        <Input {...register("courseCode")} disabled readOnly />
      </FormRow>
      <FormRow label="Course Name">
        <Select
          disabled={isWorking}
          {...register("courseName", { required: "This field is needeed" })}
          type="white"
        >
          {courses?.map((ele) => (
            <option key={ele.course} value={ele.course}>
              {ele.course}
            </option>
          ))}
        </Select>
      </FormRow>

      {/* <Flex gap="1rem"> */}
      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          type="date"
          disabled={isWorking}
          {...register("startDate", { required: "This field is needeed" })}
        />
      </FormRow>
      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          type="date"
          disabled={isWorking}
          {...register("endDate", { required: "This field is needeed" })}
        />
      </FormRow>
      {isEditSession && (
        <FormRow label="Active">
          <Input
            type="checkbox"
            checked={isChecked}
            disabled={isWorking}
            onChange={() => setIsChecked((p) => !p)}
          />
        </FormRow>
      )}
      {/* </Flex> */}
      <Button disabled={isWorking}>
        {isEditSession ? "Edit Session" : "Add Session"}
      </Button>
    </Form>
  );
}
