"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

export default function OrdersPage() {
  const [orders, setOrders] =
    useState<any[]>([]);

  const loadOrders = async () => {
    const response =
      await fetch("/api/orders");

    const data =
      await response.json();

    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    await fetch(
      "/api/orders/status",
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      }
    );

    loadOrders();
  };

  const getStatusColor = (
    status: string
  ) => {
    switch (status) {
      case "Delivered":
        return "bg-green-600";

      case "Shipped":
        return "bg-blue-600";

      case "Processing":
        return "bg-yellow-600";

      case "Cancelled":
        return "bg-red-600";

      default:
        return "bg-zinc-600";
    }
  };

  const getPaymentColor = (
    status: string
  ) => {
    switch (status) {
      case "Paid":
        return "bg-green-600";

      default:
        return "bg-orange-600";
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="font-serif text-6xl mb-10">
            Orders Dashboard
          </h1>

          {orders.length === 0 ? (
            <p>
              No orders found.
            </p>
          ) : (
            <div className="space-y-10">

              {orders.map(
                (
                  order,
                  index
                ) => (
                  <div
                    key={order._id}
                    className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800"
                  >

                    {/* HEADER */}

                    <div className="bg-zinc-950 p-6 border-b border-zinc-800">

                      <div className="flex flex-wrap gap-6 justify-between">

                        <div>
                          <p className="text-zinc-500 text-sm">
                            ORDER
                          </p>

                          <p>
                            #{index + 1}
                          </p>
                        </div>

                        <div>
                          <p className="text-zinc-500 text-sm">
                            DATE
                          </p>

                          <p>
                            {new Date(
                              order.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-zinc-500 text-sm">
                            TOTAL
                          </p>

                          <p className="text-yellow-500 font-semibold">
                            ₹
                            {order.total}
                          </p>
                        </div>

                      </div>

                      <div className="flex flex-wrap gap-3 mt-5">

                        <span
                          className={`px-4 py-2 rounded-full text-sm ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {
                            order.status
                          }
                        </span>

                        <span
                          className={`px-4 py-2 rounded-full text-sm ${getPaymentColor(
                            order.paymentStatus
                          )}`}
                        >
                          Payment:
                          {" "}
                          {
                            order.paymentStatus
                          }
                        </span>

                        {order.couponCode && (
                          <span className="px-4 py-2 rounded-full text-sm bg-purple-700">
                            Coupon:
                            {" "}
                            {
                              order.couponCode
                            }
                          </span>
                        )}

                      </div>

                    </div>

                    {/* CUSTOMER */}

                    <div className="p-6 border-b border-zinc-800">

                      <h2 className="text-2xl mb-5">
                        Customer Information
                      </h2>

                      <div className="grid md:grid-cols-2 gap-4">

                        <p>
                          <strong>
                            Name:
                          </strong>
                          {" "}
                          {
                            order.customer
                              ?.name
                          }
                        </p>

                        <p>
                          <strong>
                            Email:
                          </strong>
                          {" "}
                          {
                            order.customer
                              ?.email
                          }
                        </p>

                        <p>
                          <strong>
                            Phone:
                          </strong>
                          {" "}
                          {
                            order.customer
                              ?.phone
                          }
                        </p>

                        <p>
                          <strong>
                            City:
                          </strong>
                          {" "}
                          {
                            order.customer
                              ?.city
                          }
                        </p>

                      </div>

                      <div className="mt-4">

                        <strong>
                          Address:
                        </strong>

                        <p className="text-zinc-400 mt-1">
                          {
                            order.customer
                              ?.address
                          }
                        </p>

                      </div>

                    </div>

                    {/* PRODUCTS */}

                    <div className="p-6 border-b border-zinc-800">

                      <h2 className="text-2xl mb-5">
                        Ordered Products
                      </h2>

                      <div className="space-y-4">

                        {order.items?.map(
                          (
                            item: any
                          ) => (
                            <div
                              key={
                                item.id
                              }
                              className="bg-zinc-950 rounded-2xl p-4 flex flex-col md:flex-row gap-5"
                            >

                              <img
                                src={
                                  item.image
                                }
                                alt={
                                  item.name
                                }
                                className="w-28 h-28 object-cover rounded-xl"
                              />

                              <div className="flex-1">

                                <h3 className="text-xl font-semibold">
                                  {
                                    item.name
                                  }
                                </h3>

                                <p className="text-yellow-500 mt-2">
                                  ₹
                                  {
                                    item.price
                                  }
                                </p>

                                <p className="text-zinc-400 mt-1">
                                  Quantity:
                                  {" "}
                                  {
                                    item.quantity
                                  }
                                </p>

                                <p className="text-zinc-400 mt-1">
                                  Subtotal:
                                  {" "}
                                  ₹
                                  {item.price *
                                    item.quantity}
                                </p>

                              </div>

                            </div>
                          )
                        )}

                      </div>

                    </div>

                    {/* STATUS MANAGEMENT */}

                    <div className="p-6">

                      <h2 className="text-2xl mb-4">
                        Update Order Status
                      </h2>

                      <select
                        value={
                          order.status ||
                          "Pending"
                        }
                        onChange={(e) =>
                          updateStatus(
                            order._id,
                            e.target.value
                          )
                        }
                        className="bg-black p-4 rounded-xl border border-zinc-700"
                      >
                        <option>
                          Pending
                        </option>

                        <option>
                          Processing
                        </option>

                        <option>
                          Shipped
                        </option>

                        <option>
                          Delivered
                        </option>

                        <option>
                          Cancelled
                        </option>

                      </select>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </main>
    </>
  );
}