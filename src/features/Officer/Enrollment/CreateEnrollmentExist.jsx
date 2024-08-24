import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocalEnroll } from "../../../hook/EnrollmentListContext";
import Form from "./Form";
import Select from "../../../ui/Select";
import Heading from "../../../ui/Heading";
import CourseRegUi from "./CourseRegUi";
import Input from "../../../ui/Input";
import { useSession } from "../Session/useSession";
import Flex from "../../../ui/Flex";
import Button from "../../../ui/Button";
import { format } from "date-fns";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateEnrollmentExist({ onCloseModal, exist }) {
  const { data: session, error } = useSession();
  const navigate = useNavigate()

  const activeSession = session?.filter((ele) => ele.active);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: exist,
  });

  const { enrollArr: value, setEnroll } = useLocalEnroll();
  const selectedCourseName = watch("courseName");
  const bnk = watch("bank");


  useEffect(() => {
    const x = activeSession?.find((ele) =>
      ele.courseName.includes(selectedCourseName)
    );
    if (x) {
      if (getValues("courseCode") !== x.courseCode)
        setValue("courseCode", x.courseCode);
      if (getValues("codeAlt") !== x.codeAlt) setValue("codeAlt", x.codeAlt);
      if (getValues("startDate") !== x.startDate)
        setValue("startDate", x.startDate);
      if (getValues("endDate") !== x.endDate) setValue("endDate", x.endDate);
      if (getValues("newAmount") !== x.newAmount)
        setValue("newAmount", x.newAmount);
      if (getValues("renewAmount") !== x.renewAmount)
        setValue("renewAmount", x.renewAmount);
    }
  }, [activeSession, setValue, selectedCourseName, getValues]);

  function calculateAmount({ newAmount, renewAmount }, isRenewal) {
    const newA = Number(newAmount);
    const ren = Number(renewAmount);
    // console.log(typeof newAmount, typeof renewAmount, isRenewal);
    if (isRenewal) {
      return ren === 0 ? newA : ren;
    } else {
      return newA;
    }
  }

  function onSubmit(data) {
    const { id,newAmount, renewAmount, ...newObject } = data;

    const newObj = {
      ...newObject,
      isSignature: null,
      certificateNo: "",
      status: false,
      printStatus: false,
      enrollDate: format(new Date(), "dd MMMM yy, hh:mm aaa"),
      amount: calculateAmount({ newAmount, renewAmount }, data.isRenewal),
      lid: nanoid(),
    };
    console.log(newObj);
    toast.success(`${data.firstName} has been added to the list`);
    setEnroll([...value, newObj]);
    onCloseModal?.();
    navigate('/dashboard/enrollment')
    reset();
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h2">Course Registrattion</Heading>
      <CourseRegUi
        activeSession={activeSession}
        register={register}
        errors={errors}
        bnk={bnk}
        watch={watch}
        getValues={getValues}
      />
      <Heading as="h2">Means of Identification</Heading>
      <div>
        <Form.FormMultipleRow>
          <Select {...register("means")}>
            {[
              "National Id Card",
              "Drivers Lincence",
              "International Passport",
              "Discharge Book",
            ].map((ele) => (
              <option key={ele} value={ele.split(" ").join("")}>
                {ele}
              </option>
            ))}
          </Select>
          <Input placeholder="Identity Number" {...register("meansId")} />
        </Form.FormMultipleRow>
        <Flex gap="1em">
          <Button type="reset" variation="secondary">
            Cancel
          </Button>
          <Button>Enroll Student</Button>
        </Flex>
      </div>
      <Input type="hidden" {...register("startDate")} />
      <Input type="hidden" {...register("endDate")} />
      <Input type="hidden" {...register("codeAlt")} />
      <Input type="hidden" {...register("courseCode")} />
      <Input type="text" {...register("newAmount")} hidden />
      <Input type="text" {...register("renewAmount")} hidden />
    </Form>
  );
}
