import z from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().optional(),
    phone: z
      .string()
      .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number")
      .optional(),
    address: z.string().optional(),
  }),
});

const userValidation = {
  createUserValidationSchema,
};

export default userValidation;
