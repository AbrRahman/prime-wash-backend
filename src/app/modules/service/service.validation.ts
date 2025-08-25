import z from "zod";

const createServiceValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
    description: z.string().trim().min(1, "Description is required"),
    price: z.string().trim().min(1, "Price is required"),
    duration: z.string().trim().min(1, "Duration is required"),
  }),
});

const serviceValidation = {
  createServiceValidationSchema,
};
export default serviceValidation;
