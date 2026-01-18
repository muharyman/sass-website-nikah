import crypto from "crypto";
import { NextResponse } from "next/server";
import { pricingPlans } from "@/config/pricing";
import { createMidtransTransaction } from "@/lib/midtrans";

type CheckoutRequest = {
  planId?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequest;
    const plan = pricingPlans.find((item) => item.id === body.planId);

    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    if (plan.price === 0) {
      return NextResponse.json(
        { error: "Free plan does not require payment" },
        { status: 400 }
      );
    }

    const orderId = `nikah-${crypto.randomUUID()}`;

    const transaction = await createMidtransTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: plan.price,
      },
      item_details: [
        {
          id: plan.id,
          price: plan.price,
          quantity: 1,
          name: `${plan.name} Plan`,
        },
      ],
    });

    return NextResponse.json({ redirectUrl: transaction.redirect_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}
