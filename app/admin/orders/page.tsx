"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  const loadOrders = async () => {
    const response = await fetch("/api/orders");
    const data = await response.json();

    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    await fetch("/api/orders/status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status,
      }),
    });

    loadOrders();
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 px-6">
        <div className="max-w-7xl mx-auto">

          <h1 className="font-serif text-6xl mb-10">
            Orders
          </h1>

          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="space-y-6">

              {orders.map((order, index) => (
                <div
                  key={order._id}
                  className="bg-zinc-900 rounded-3xl p-6"
                >
                  <h2 className="text-2xl mb-4">
                    Order #{index + 1}
                  </h2>

                  <p>
                    Customer: {order.customer?.name}
                  </p>

                  <p>
                    Email: {order.customer?.email}
                  </p>

                  <p>
                    Phone: {order.customer?.phone}
                  </p>

                  <p>
                    City: {order.customer?.city}
                  </p>

                  <p>
                    Payment: {order.paymentMethod}
                  </p>

                  <p className="text-yellow-500 mt-2">
                    Total: ₹{order.total}
                  </p>

                  <div className="mt-4">
                    <h3 className="font-semibold">
                      Items:
                    </h3>

                    {order.items?.map(
                      (item: any) => (
                        <p
                          key={item.id}
                          className="text-zinc-400"
                        >
                          {item.name} × {item.quantity}
                        </p>
                      )
                    )}
                  </div>

                  <div className="mt-6 border-t border-zinc-800 pt-4">

                    <p className="mb-2">
                      Status:
                      <span className="ml-2 text-yellow-500">
                        {order.status || "Pending"}
                      </span>
                    </p>

                    <select
                      defaultValue={
                        order.status || "Pending"
                      }
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="bg-black p-3 rounded-xl"
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </main>
    </>
  );
}