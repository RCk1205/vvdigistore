"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any>(null);

  const trackOrder = async () => {
    const response = await fetch(
      `/api/orders/${orderId}`
    );

    const data = await response.json();

    setOrder(data);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 px-6">

        <div className="max-w-3xl mx-auto">

          <h1 className="font-serif text-6xl mb-10">
            Track Order
          </h1>

          <input
            type="text"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) =>
              setOrderId(e.target.value)
            }
            className="w-full bg-zinc-900 p-4 rounded-xl mb-6"
          />

          <button
            onClick={trackOrder}
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl"
          >
            Track
          </button>

          {order && (
            <div className="bg-zinc-900 rounded-3xl p-6 mt-10">

              <h2 className="text-2xl mb-4">
                Order Status
              </h2>

              <p className="text-yellow-500 text-xl">
                {order.status}
              </p>

              <p className="mt-4">
                Customer:
                {" "}
                {order.customer?.name}
              </p>

              <p>
                Total:
                {" "}
                ₹{order.total}
              </p>

            </div>
          )}

        </div>

      </main>
    </>
  );
}