import axios from "axios";
import AppError from "../../errors/appError";
import status from "http-status";
import { TPaymentPayload } from "./payment.interfact";
import config from "../../config";
import BookingModel from "../booking/booking.model";
import SlotModel from "../slot/slot.model";

// create payment url;
const createPaymentUrl = async (payload: TPaymentPayload) => {
  try {
    const url = `${config.aamrpay_base_url}/jsonpost.php`;
    const { data } = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
      timeout: 10000, // 10s timeout
    });

    if (data.result === "true" && data.payment_url) {
      return { payment_url: data.payment_url };
    }

    return { payment_url: null, error: "Failed to create payment" };
  } catch (err: any) {
    console.error("Payment API error:", err.message || err);
    return { payment_url: null, error: "Payment API error" };
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

  if (!result) {
    throw new AppError(status.BAD_REQUEST, "No unpaid booking found");
  }
  const slot = await SlotModel.findByIdAndUpdate(
    result?.slot,
    {
      isBooked: "available",
    },
    {
      runValidators: true,
      new: true,
    }
  );
  if (!slot) {
    throw new AppError(status.BAD_GATEWAY, "No update available slot");
  }
  return;
};

const paymentService = {
  createPaymentUrl,
  paymentSuccess,
  paymentFailOrCancel,
};
export default paymentService;
