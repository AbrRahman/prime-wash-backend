import axios from "axios";
import AppError from "../../errors/appError";
import status from "http-status";
import { TPaymentPayload } from "./payment.interfact";
import config from "../../config";
import BookingModel from "../booking/booking.model";

// create payment url;
const createPaymentUrl = async (payload: TPaymentPayload) => {
  try {
    const { data } = await axios.post(
      `${config.aamrpay_base_url}/jsonpost.php`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    if (data?.result === "true" && data?.payment_url) {
      return { payment_url: data.payment_url };
    }

    throw new AppError(status.BAD_GATEWAY, "Failed to create payment");
  } catch (err) {
    throw new Error(err as any);
  }
};

//after payment update booking modal payment status
const paymentSuccess = async () => {
  const result = await BookingModel.findOneAndUpdate(
    { paymentStatus: "unpaid" },
    {
      paymentStatus: "paid",
    },
    {
      runValidators: true,
      new: true,
    }
  );
  return result;
};

// if payment filed or payment cancel delead the unpaid booking data
const paymentFailOrCancel = async () => {
  const result = await BookingModel.findOneAndDelete({
    paymentStatus: "unpaid",
  });
  return result;
};

const paymentService = {
  createPaymentUrl,
  paymentSuccess,
  paymentFailOrCancel,
};
export default paymentService;
