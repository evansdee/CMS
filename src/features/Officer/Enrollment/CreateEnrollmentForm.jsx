import styled from "styled-components";
import { useEffect } from "react";
import Input from "../../../ui/Input";
import Form from "./Form";
import Label from "../../../ui/Label";
import Select from "../../../ui/Select";
import { useForm } from "react-hook-form";
import Heading from "../../../ui/Heading";
import Button from "../../../ui/Button";
import { useSession } from "../Session/useSession";

const StyledContainer = styled.div`
  /* width: 100%; */
  /* height: 100%; */
  /* padding: 2em 0; */
`;
export default function CreateEnrollmentForm() {
  const { data } = useSession();

  const activeSession = data?.filter((ele) => ele.active);
  console.log(activeSession);
  const { register, handleSubmit, watch, formState, setValue, getValues } =
    useForm({
      defaultValues: {
        marital: ["Single"][0],
        BsBank2: ["Amju Bank"][0],
      },
    });
  const selectedCourseName = watch("courseName");

  useEffect(() => {
    const x = activeSession.find((ele) =>
      ele.courseName.includes(selectedCourseName)
    );
    if (x) {
      setValue("courseCode", `${x.courseCode}/${x.codeAlt}`);
    }
  }, [activeSession, setValue, selectedCourseName]);

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h3">Personal Information</Heading>
        <div>
          <Form.FormMultipleRow>
            <Input type="file" {...register('photo')}/>
            <p></p>
            <p></p>
          </Form.FormMultipleRow>

          <Form.FormMultipleRow>
            <Label label="First Name">
              <Input {...register("firstName")} />
            </Label>
            <Label label="Middle Name">
              <Input {...register("middleName")} />
            </Label>
            <Label label="Last Name">
              <Input {...register("lastName")} />
            </Label>
          </Form.FormMultipleRow>
          <Form.FormMultipleRow>
            <Label label="Date of Birth">
              <Input {...register("dob")} type="date" />
            </Label>
            <Label label="Gender">
              <Input {...register("gender")} />
            </Label>
            <Label label="Marital Status">
              <Select {...register("marital")}>
                {[
                  "Single",
                  "Happy Marriage",
                  "Tricked into Marriage",
                  "Divorced",
                ]?.map((ele) => (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                ))}
              </Select>
            </Label>
          </Form.FormMultipleRow>
          <Form.FormMultipleRow>
            <Label label="Nationality">
              <Input {...register("country")} />
            </Label>
            <Label label="State of Origin">
              <Input {...register("state")} />
            </Label>
            <Label label="LGA">
              <Input {...register("lga")} />
            </Label>
          </Form.FormMultipleRow>
        </div>
        <Heading as="h2">Contact Information</Heading>
        <div>
          <Form.FormSingleRow>
            <Label label="Address">
              <Input {...register("address")} />
            </Label>
          </Form.FormSingleRow>
          <Form.FormSingleRow>
            <Label label="State Reside in">
              <Input {...register("stateReside")} />
            </Label>
          </Form.FormSingleRow>
          <Form.FormMultipleRow>
            <Label label="Phone Number">
              <Input {...register("gsm")} />
            </Label>
            <Label label="Email Address">
              <Input {...register("email")} />
            </Label>
          </Form.FormMultipleRow>
        </div>
        <Heading as="h2">Course Registrattion</Heading>
        <div>
          <Form.FormMultipleRow>
            <Label label="Course">
              <Select {...register("courseName")}>
                {activeSession?.map((ele) => (
                  <option key={ele.id} value={ele.courseName}>
                    {ele.courseName}
                  </option>
                ))}
              </Select>
            </Label>
            <Label label="Course Renewal">
              <Input type="checkbox" />
              <Input type="hidden" {...register("courseCode")} />
            </Label>
            <Label label="Bank">
              <Select {...register("bank")}>
                {["AMJU bank", "Zenith Bank"]?.map((ele) => (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                ))}
              </Select>
            </Label>
            <Label label="Amount">
              <Input />
            </Label>
            <Label label="Teller No">
              <Input />
            </Label>
          </Form.FormMultipleRow>
        </div>
        <Heading as="h2">Means of Identification</Heading>
        <div>
          <Form.FormMultipleRow>
            <Label label="Bational">
              <Input />
            </Label>
            <Label label="Id">
              <Input />
            </Label>
            <p></p>
          </Form.FormMultipleRow>
        </div>

        <Form.FormMultipleRow>
          <Button>Cancel</Button>
          <Button>Enroll Student</Button>
        </Form.FormMultipleRow>
      </Form>
    </StyledContainer>
  );
}
