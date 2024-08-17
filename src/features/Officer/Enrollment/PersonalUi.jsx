/* eslint-disable react/prop-types */
import FileInput from "../../../ui/FileInput";
import Input from "../../../ui/Input";
import Label from "../../../ui/Label";
import Select from "../../../ui/Select";
import Form from "./Form";

export default function PersonalUi({
  register,
  isLoading,
  country,
  state,
  errors,
}) {
  return (
    <>
      <div>
        <Form.FormMultipleRow>
          <FileInput
            type="file"
            accept="image/*"
            {...register("photo", { required: "nigga enter" })}
            error={errors?.photo?.message}
          />
          <p></p>
          <p></p>
        </Form.FormMultipleRow>

        <Form.FormMultipleRow>
          <Label label="First Name" error={errors?.firstName?.message}>
            <Input
              {...register("firstName", { required: "This field is required" })}
            />
          </Label>
          <Label label="Middle Name" error={errors?.middleName?.message}>
            <Input {...register("middleName")} />
          </Label>
          <Label label="Last Name" error={errors?.lastName?.message}>
            <Input
              {...register("lastName", { required: "This field is required" })}
            />
          </Label>
        </Form.FormMultipleRow>
        <Form.FormMultipleRow>
          <Label label="Date of Birth" error={errors?.dob?.message}>
            <Input
              {...register("dob", { required: "This field is required" })}
              type="date"
            />
          </Label>
          <Label label="Gender">
            <Select {...register("gender")}>
              {["Male", "Female", "Lesbian", "Sam unknown Gender"].map(
                (ele) => (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                )
              )}
            </Select>
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
            <Select {...register("country")}>
              {country?.map((ele) => (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              ))}
            </Select>
          </Label>
          <Label label="State of Origin" error={errors?.state?.message}>
            <Select
              {...register("state", { required: "This field is required" })}
              disabled={isLoading}
            >
              <option value="">Select a state</option>
              {state?.map((state, index) => (
                <option key={index} value={state.name}>
                  {state.name}
                </option>
              ))}
            </Select>
          </Label>
          <Label label="LGA">
            <Input {...register("lga")} />
          </Label>
        </Form.FormMultipleRow>
      </div>
    </>
  );
}
