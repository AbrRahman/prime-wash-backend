export type TPaymentPayload = {
  store_id: string;
  signature_key: string;
  tran_id: string;
  amount: string;
  currency: string;
  desc: string;
  cus_name: string;
  cus_email: string;
  cus_phone: string;
  success_url: string;
  fail_url: string;
  cancel_url: string;
  type: string;
};
