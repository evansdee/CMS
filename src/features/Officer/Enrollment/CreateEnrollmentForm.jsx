import styled from "styled-components";
import { useEffect, useState } from "react";
import Input from "../../../ui/Input";
import Form from "./Form";
import Select from "../../../ui/Select";
import { useForm } from "react-hook-form";
import Heading from "../../../ui/Heading";
import Button from "../../../ui/Button";
import { useSession } from "../Session/useSession";
import { useCountry, useStateApi } from "../../../hook/useCountry";
import PersonalUi from "./PersonalUi";
import ContactUi from "./ContactUi";
import CourseRegUi from "./CourseRegUi";
import { useNavigate } from "react-router-dom";
import Flex from "../../../ui/Flex";
import { useLocalEnroll } from "../../../hook/EnrollmentListContext";
import toast from "react-hot-toast";
import { format } from "date-fns";

const StyledContainer = styled.div``;
export default function CreateEnrollmentForm() {
  const navigate = useNavigate();
  const [isStay, setIsStay] = useState(false);
  const { data: session } = useSession();

  const activeSession = session?.filter((ele) => ele.active);
  const { mutate, data: state, isLoading } = useStateApi();

  const {
    register,
    handleSubmit,
    watch,
    formState,
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      marital: ["Single"][0],
      means: ["NationalIdCard"][0],
      gender: ["Male"][0],
      country: ["Nigeria"][0],

      // FOR TEST PURPOSES
      firstName: "Evans",
      middleName: "EmuoboNuvie",
      lastName: "Diegbe",

      dob: "2024-04-12",
      photo: "two.jpg",
      address: "jfff",
      gsm: "ddkd",
      courseName: ["EFFICIENT DECK HAND"][0],
      bank: ["AMJU bank"][0],
    },
  });

  const { errors } = formState;

  const selectedCountry = watch("country");

  useEffect(() => {
    mutate(selectedCountry);
  }, [selectedCountry, mutate]);

  const selectedCourseName = watch("courseName");
  const bnk = watch("bank");

  useEffect(() => {
    const x = activeSession?.find((ele) =>
      ele.courseName.includes(selectedCourseName)
    );
    if (x) {
      setValue("courseCode", x.courseCode);
      setValue("codeAlt", x.codeAlt);
      setValue("startDate", x.startDate);
      setValue("endDate", x.endDate);
      setValue("newAmount", x.newAmount);
      setValue("renewAmount", x.renewAmount);
    }
  }, [activeSession, setValue, selectedCourseName]);

  const { country } = useCountry();
  const { enrollArr: value, setEnroll } = useLocalEnroll();

  function onSubmit(data) {
  
    const image = data.photo[0];

    const {newAmount,renewAmount,...newObject} = data
    let newObj = {
      ...newObject,
      fullName: `${data.firstName} ${data.middleName} ${data.lastName}`,
      photo: image,
      status: false,
      enrollDate: format(new Date(),'dd MMMM yy, hh:mm aaa'),
      amount: data.isRenewal ? renewAmount : newAmount,
      // enrollDate: new Date().toISOString(),
    };

    setEnroll([...value, newObj]);
    toast.success(`${data.firstName} has been Enrolled`);

    reset();
    if (!isStay) navigate("/dashboard/enrollment");
  }

  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h3">Personal Information</Heading>

        <PersonalUi
          register={register}
          isLoading={isLoading}
          state={state}
          country={country}
          errors={errors}
        />
        <Heading as="h2">Contact Information</Heading>

        <ContactUi
          register={register}
          data={[state, isLoading]}
          errors={errors}
        />
        <Heading as="h2">Course Registrattion</Heading>
        <CourseRegUi
          activeSession={activeSession}
          register={register}
          getValues={getValues}
          bnk={bnk}
          errors={errors}
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
            <p></p>
          </Form.FormMultipleRow>
        </div>

        <Flex justify="space-between" align="center">
          <label>
            <Flex gap=".5em" align="center">
              <input
                type="checkbox"
                checked={isStay}
                onChange={() => setIsStay((p) => !p)}
              />
              <span>Stay on this page after I clock Enroll Student</span>
            </Flex>
          </label>

          <Flex gap="1em">
            <Button type="reset" variation="secondary">
              Cancel
            </Button>
            <Button>Enroll Student</Button>
          </Flex>
        </Flex>
        <Input type="hidden" {...register("startDate")} />
        <Input type="hidden" {...register("endDate")} />
        <Input type="hidden" {...register("codeAlt")} />
        <Input type="text" {...register("newAmount")} hidden />
        <Input type="text" {...register("renewAmount")} hidden />
      </Form>
    </StyledContainer>
  );
}