type MidtransTransactionPayload = {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  item_details?: Array<{
    id: string;
    price: number;
    quantity: number;
    name: string;
  }>;
  customer_details?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  };
};

type MidtransTransactionResponse = {
  token: string;
  redirect_url: string;
};

function getMidtransBaseUrl() {
  return process.env.MIDTRANS_IS_PRODUCTION === "true"
    ? "https://app.midtrans.com"
    : "https://app.sandbox.midtrans.com";
}

function getMidtransAuthHeader() {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) {
    throw new Error("Missing MIDTRANS_SERVER_KEY");
  }

  const encoded = Buffer.from(`${serverKey}:`).toString("base64");
  return `Basic ${encoded}`;
}

export async function createMidtransTransaction(
  payload: MidtransTransactionPayload
) {
  const response = await fetch(`${getMidtransBaseUrl()}/snap/v1/transactions`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getMidtransAuthHeader(),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Midtrans error: ${errorText}`);
  }

  return (await response.json()) as MidtransTransactionResponse;
}
