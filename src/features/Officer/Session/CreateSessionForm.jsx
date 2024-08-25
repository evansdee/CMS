/* eslint-disable react/prop-types */
import Input from "../../../ui/Input";
import FormRow from "../../../ui/FormRow";
import Select from "../../../ui/Select";
import Button from "../../../ui/Button";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Form from "../../../ui/Form";
import { useCreateEditSession } from "./useCreateEditSession";
import { isAfter } from "date-fns";
import { useEditSession } from "./useEditSession";
import { useCourse } from "../Enrollment/useCourse";

export default function CreateSessionForm({
  sessionToEdit = {},
  onCloseModal,
}) {
  const { data: sessionArr } = useCourse();

  const session = sessionArr.sort((a, b) => {
    if (a.courseName.toLowerCase() < b.courseName.toLowerCase()) return -1;
    if (a.courseName.toLowerCase() > b.courseName.toLowerCase()) return 1;
    return 0;
  });

  const { mutate, isPending: isLoading,isError } = useCreateEditSession();
  const { editSession, isEditing,isError:isEditError } = useEditSession();

  const isWorking = isLoading || isEditing;
  const { id: editId, ...editValues } = sessionToEdit;
  const isEditSession = Boolean(editId);
  const [isChecked, setIsChecked] = useState(editValues.active);

  const { register, handleSubmit, watch, formState, setValue, reset } = useForm(
    {
      defaultValues: isEditSession
        ? editValues
        : {
            courseName: session[0].courseName,
            courseCode: session[0].courseCode,
            startDate: "2024-08-01",
            endDate: "2024-08-05",
          },
    }
  );

  const { errors } = formState;
  const selectedCourseName = watch("courseName");

  useEffect(() => {
    const x = session.find((ele) =>
      ele.courseName.includes(selectedCourseName)
    );
    if (x) {
      setValue("courseCode", x.courseCode);
      setValue("codeAlt", x.codeAlt);
      setValue("newAmount", x.newAmount);
      setValue("renewAmount", x.renewAmount);
    }
  }, [session, setValue, selectedCourseName]);

  function onSubmit(data) {
    if (isError || isEditError) {
      console.error("An error occurred. Unable to proceed with submission.");
      return; // Exit the function if there is an error
    }
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
      // console.log(data);
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
          {session?.map((ele) => (
            <option key={ele.courseName} value={ele.courseName}>
              {ele.courseName}
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
            id="active"
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
