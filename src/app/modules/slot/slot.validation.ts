import z from "zod";

const createSlotValidationSchema = z.object({
  body: z.object({
    service: z.string().min(1, "Service ID is required"),
    date: z.string().min(1, "Date is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  }),
});

const slotValidation = {
  createSlotValidationSchema,
};

export default slotValidation;
