import { RegisterInput } from "../types/RegisterInput";

export const validateRegisterInput = (registerInput: RegisterInput) => {
  if (!registerInput.email.includes("@"))
    return {
      message: "Invalid email",
      errors: [
        {
          field: "email",
          message: "Email must include @ symbol",
        },
      ],
    };

  if (registerInput.username.length <= 3)
    return {
      message: "Invalid username",
      errors: [
        {
          field: "username",
          message: "Length username must be greater than 3 characters",
        },
      ],
    };

  if (registerInput.username.includes("@"))
    return {
      message: "Invalid username",
      errors: [
        {
          field: "username",
          message: "Username can not include @ symbol",
        },
      ],
    };

  if (registerInput.password.length <= 3)
    return {
      message: "Invalid password",
      errors: [
        {
          field: "password",
          message: "Length password must be greater than 3 characters",
        },
      ],
    };
  return null;
};
