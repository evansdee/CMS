import {} from "react";
import { useStudent } from "../Enrollment/useEnrollment";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Form from "../Enrollment/Form";
import styled from "styled-components";
import Label from "../../../ui/Label";
import Image from "../../../ui/Image";
import Input from "../../../ui/Input";
import FileInput from "../../../ui/FileInput";
import Flex from "../../../ui/Flex";
import Button from "../../../ui/Button";
import { useUpdateEnrollment } from "../Approval/useUpdateEnrollment";
import toast from "react-hot-toast";
import { format } from "date-fns";
import SpinnerMini from "../../../ui/SpinnerMini";
import ButtonIcon from "../../../ui/ButtonIcon";
import { FaBackspace } from "react-icons/fa";

const Container = styled(Flex)`
  /* align-items: center; */
  justify-content: center;
  margin: 3em auto;
  position: relative;


  @media (max-width: 768px) {
    margin: 1em 0;
  }
`;

const EditForm = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 5em;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: initial;
    gap: 2em;
  }
  .back {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export default function Student() {
  const { id } = useParams();
  const { mutate, isPending } = useUpdateEnrollment();
  const { data, isLoading } = useStudent(parseInt(id, 10));
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: data,
  });

  if (isLoading) return <p>loading</p>;

  const { photo, fullName, dob } = data;

  function onSubmit(data) {
    const photo = typeof data.photo === "string" ? data.photo : data.photo[0];
    const { firstName, middleName, lastName } = data;

    console.log(data);
    mutate(
      {
        newEnrollment: {
          ...data,
          photo,
          fullName: `${firstName} ${middleName} ${lastName}`,
        },
        id: id,
      },
      {
        onSuccess: () => {
          toast.success("Updated Successfully");
          navigate("/dashboard/student");
        },
      }
    );
  }
  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <EditForm>
            <div>
              <Flex direction="column" align="center" gap=".5em">
                <Image src={photo} />
                <h4>Fullname: {fullName}</h4>
                <p>Date of Birth: {format(dob, "dd MMM yyyy")}</p>
                <FileInput
                  type="file"
                  accept="image/*"
                  {...register("photo")}
                />
              </Flex>
            </div>
            <div>
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
              <Form.FormSingleRow>
                <Label label="Date of Birth">
                  <Input type="date" {...register("dob")} />
                </Label>
              </Form.FormSingleRow>
              <Form.FormSingleRow>
                <Label label="Country">
                  <Input {...register("country")} />
                </Label>
              </Form.FormSingleRow>
              <Form.FormSingleRow>
                <Label label="State">
                  <Input {...register("state")} />
                </Label>
              </Form.FormSingleRow>
              <Form.FormSingleRow>
                <Label label="Course Selected">
                  <Input {...register("courseName")} disabled />
                </Label>
              </Form.FormSingleRow>
              <Form.FormSingleRow>
                <Label label="Certificate Number">
                  <Input {...register("certificateNo")} disabled />
                </Label>
              </Form.FormSingleRow>
              <Button>{isPending ? <SpinnerMini /> : "Save Changes"}</Button>
            </div>
            <div className="back">
              <ButtonIcon onClick={()=>navigate(-1)}>
                <FaBackspace />
              </ButtonIcon>
            </div>
          </EditForm>
        </Form>
      </Container>
    </>
  );
}
