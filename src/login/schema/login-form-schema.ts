import z from "zod";

const schema = z.object({
    phoneNumber: z.string().min(10, "Phone number should be 10 digits")
        .max(10, "Phone number should be 10 digits")
        .regex(new RegExp("[0-9]+"), "Phone number should contain digits only"),
    password: z.string().min(4, {message: "Password should be at least 4 characters"})
});

const LoginFormSchema = schema.required();
export default LoginFormSchema;