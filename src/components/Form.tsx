import { useState } from "react";
import Button from "@mui/joy/Button";
import { Modal, ModalClose, Sheet } from "@mui/joy";
import { inputs } from "../constants";
import FormInput from "./FormInput";

export default function Form() {
  const [open, setOpen] = useState<boolean>(false);
  const [values, setValues] = useState<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    [key: string]: string;
  }>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic
  };

  const onChange = (name: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    console.log(values);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="neutral"
        sx={{ marginRight: {} }}
        onClick={() => setOpen(true)}
      >
        Sign up
      </Button>
      <Modal
        aria-labelledby="Form"
        aria-describedby="Form"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
          />
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={(value) => onChange(input.name, value)}
              />
            ))}
            <Button color="neutral">Submit</Button>
          </form>
        </Sheet>
      </Modal>
    </>
  );
}
