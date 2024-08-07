/* eslint-disable react/prop-types */
import Input from "../../../ui/Input";
import Label from "../../../ui/Label";
import Select from "../../../ui/Select";
import Form from "./Form";

export default function ContactUi({ register, data, errors }) {
  return (
    <>
      <div>
        <Form.FormSingleRow>
          <Label label="Address" error={errors?.address?.message}>
            <Input
              {...register("address", { required: "This field is required" })}
            />
          </Label>
        </Form.FormSingleRow>
        <Form.FormSingleRow>
          <Label label="State Reside in" error={errors?.stateReside?.message}>
            <Select
              {...register("stateReside", {
                required: "This field is required",
              })}
              disabled={data[1]}
            >
              <option value="">What state does the applicant reside in?</option>
              {data[0]?.map((state, index) => (
                <option key={index} value={state.name}>
                  {state.name.split(' ')[0]}
                </option>
              ))}
            </Select>
          </Label>
        </Form.FormSingleRow>
        <Form.FormMultipleRow>
          <Label label="Phone Number" error={errors?.gsm?.message}>
            <Input
              {...register("gsm", { required: "This field is required" })}
            />
          </Label>
          <Label label="Email Address">
            <Input {...register("email")} />
          </Label>
        </Form.FormMultipleRow>
      </div>
    </>
  );
}
