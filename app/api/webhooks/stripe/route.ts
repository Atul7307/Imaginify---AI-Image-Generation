/* eslint-disable camelcase */
import { NextResponse } from "next/server";
import stripe from "stripe";

import { createTransaction } from "@/lib/actions/transaction.actions";
import { handleApiError, successResponse } from "@/lib/api-error";

export async function POST(request: Request) {
  try {
    const body = await request.text();

    const sig = request.headers.get("stripe-signature") as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    if (!endpointSecret) {
      return NextResponse.json(
        { success: false, error: "Stripe webhook secret not configured", code: "MISSING_SECRET" },
        { status: 500 }
      );
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { success: false, error: "Webhook verification failed", code: "VERIFICATION_FAILED" },
        { status: 400 }
      );
    }

    // Get the ID and type
    const eventType = event.type;

    // CREATE
    if (eventType === "checkout.session.completed") {
      const { id, amount_total, metadata } = event.data.object;

      const transaction = {
        stripeId: id,
        amount: amount_total ? amount_total / 100 : 0,
        plan: metadata?.plan || "",
        credits: Number(metadata?.credits) || 0,
        buyerId: metadata?.buyerId || "",
        createdAt: new Date(),
      };

      const newTransaction = await createTransaction(transaction);
      return NextResponse.json(successResponse({ message: "Transaction created", transaction: newTransaction }));
    }

    return NextResponse.json(successResponse({ message: "Webhook processed" }));
  } catch (error) {
    const { statusCode, body } = handleApiError(error, "Stripe Webhook");
    return NextResponse.json(body, { status: statusCode });
  }
}
