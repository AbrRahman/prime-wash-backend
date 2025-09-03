import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import paymentService from "./payment.service";
import config from "../../config";

const createPaymentUrl = catchAsync(async (req, res, next) => {
  const { amount, name, email } = req?.body;
  const payload = {
    store_id: config.aamarpay_store_id! as string,
    signature_key: config.aamarpay_signature_key! as string,
    tran_id: `MERN-${Date.now()}`,
    amount: amount,
    currency: "BDT",
    desc: "Booking a carwash service service service",
    cus_name: name,
    cus_email: email,
    cus_phone: "01870762472",

    success_url: `${config.base_url}api/v1/payment/success`,
    fail_url: `${config.base_url}api/v1/payment/fail`,
    cancel_url: `${config.base_url}api/v1/payment/cancel`,
    type: "json",
  };
  const result = await paymentService.createPaymentUrl(payload);

  if (!result.payment_url) {
    res.status(502).json({
      success: false,
      message: result.error || "Payment creation failed",
    });
  }

  res.status(status.OK).json({
    success: true,
    message: "Payment URL created",
    data: result,
  });
});

// handle payment success
const paymentSuccessCallback = catchAsync(async (req, res, next) => {
  await paymentService.paymentSuccess();
  return res.redirect(302, config.client_url as string);
});

// handle payment failed
const paymentFailCallback = catchAsync(async (req, res, next) => {
  await paymentService.paymentFailOrCancel();
  if (req.query.from) {
    res.status(200).json({
      success: true,
      message: "Unpaid booking delete successfully",
    });
  } else {
    return res.redirect(302, config.client_url as string);
  }
});

// handle payment cancel
const paymentCancelCallback = catchAsync(async (req, res, next) => {
  await paymentService.paymentFailOrCancel();
  return res.redirect(302, config.client_url as string);
});

const paymentController = {
  createPaymentUrl,
  paymentSuccessCallback,
  paymentFailCallback,
  paymentCancelCallback,
};
export default paymentController;
