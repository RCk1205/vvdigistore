"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();

  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(
        item.price
          .toString()
          .replace(/[$,₹]/g, "")
      ) *
        item.quantity,
    0
  );

  const validateForm = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !city.trim() ||
      !address.trim()
    ) {
      alert(
        "Please fill all required fields."
      );
      return false;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return false;
    }

    return true;
  };

  const saveOrder = async () => {
const orderData = {
  customer: {
    name,
    email,
    phone,
    city,
    address,
  },

  paymentMethod,

  paymentStatus:
    paymentMethod ===
    "Cash on Delivery"
      ? "Pending"
      : "Paid",

  items: cart,

  total,
};

    const response = await fetch(
      "/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );

    const data =
      await response.json();

    if (!data.success) {
      throw new Error(
        "Failed to save order"
      );
    }

    return data.orderId;
  };

  const handleCODOrder =
    async () => {
      if (!validateForm()) {
        return;
      }

      try {
        const orderId =
          await saveOrder();

        clearCart();

        router.push(
          `/order-success?orderId=${orderId}`
        );
      } catch (error) {
        console.error(error);

        alert(
          "Failed to place order."
        );
      }
    };

  const handleOnlinePayment =
    async () => {
      if (!validateForm()) {
        return;
      }

      try {
        const response =
          await fetch(
            "/api/create-order",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                amount: total,
              }),
            }
          );

        const data =
          await response.json();

        if (
          !data.success ||
          !data.order
        ) {
          alert(
            "Unable to create payment order."
          );
          return;
        }

        const options = {
          key:
            process.env
              .NEXT_PUBLIC_RAZORPAY_KEY_ID,

          amount:
            data.order.amount,

          currency:
            data.order.currency,

          order_id:
            data.order.id,

          name:
            "Luxury Store",

          description:
            "Product Purchase",

          prefill: {
            name,
            email,
            contact:
              phone,
          },

          theme: {
            color:
              "#EAB308",
          },
handler:
  async function (
    response: any
  ) {

    console.log(
      "RAZORPAY RESPONSE:",
      response
    );

    try {
                const orderData = {
  customer: {
    name,
    email,
    phone,
    city,
    address,
  },

  paymentMethod,

  paymentStatus: "Paid",

  razorpayOrderId:
    response.razorpay_order_id,

  razorpayPaymentId:
    response.razorpay_payment_id,

  items: cart,

  total,
};

const saveResponse =
  await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify(
      orderData
    ),
  });

const saveData =
  await saveResponse.json();

const orderId =
  saveData.orderId;

                clearCart();

                router.push(
                  `/order-success?orderId=${orderId}`
                );
              } catch (
                error
              ) {
                console.error(
                  error
                );

                alert(
                  "Payment succeeded but order saving failed."
                );
              }
            },
        };

        const razorpay =
          new window.Razorpay(
            options
          );

        razorpay.open();
      } catch (error) {
        console.error(error);

        alert(
          "Failed to start payment."
        );
      }
    };

  const handleCheckout =
    async () => {
      if (
        paymentMethod ===
        "Cash on Delivery"
      ) {
        await handleCODOrder();
      } else {
        await handleOnlinePayment();
      }
    };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 px-6">
        <div className="max-w-4xl mx-auto">

          <h1 className="font-serif text-6xl mb-10">
            Checkout
          </h1>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="bg-zinc-900 p-4 rounded-xl"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="bg-zinc-900 p-4 rounded-xl"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              className="bg-zinc-900 p-4 rounded-xl"
            />

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) =>
                setCity(
                  e.target.value
                )
              }
              className="bg-zinc-900 p-4 rounded-xl"
            />

          </div>

          <input
            type="text"
            placeholder="Street Address"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            className="bg-zinc-900 p-4 rounded-xl w-full mt-6"
          />

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
            className="bg-zinc-900 p-4 rounded-xl w-full mt-6"
          >
            <option>
              Cash on Delivery
            </option>

            <option>
              Credit Card
            </option>

            <option>
              UPI
            </option>
          </select>

          <div className="mt-10 border-t border-zinc-800 pt-8">

            <h2 className="text-3xl mb-4">
              Order Total
            </h2>

            <p className="text-yellow-500 text-2xl">
              ₹
              {total.toLocaleString()}
            </p>

            <button
              className="mt-6 bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold hover:bg-yellow-400 transition"
              onClick={
                handleCheckout
              }
            >
              Place Order
            </button>

          </div>

        </div>
      </main>
    </>
  );
}