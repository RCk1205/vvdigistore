"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function AccountPage() {
  const { data: session, status } =
    useSession();

  const router = useRouter();

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (
      status === "unauthenticated"
    ) {
      router.push("/login");
      return;
    }

    if (
      status === "authenticated"
    ) {
      fetchOrders();
    }
  }, [status]);

  const fetchOrders =
    async () => {
      try {
        const response =
          await fetch(
            "/api/my-orders"
          );

        const data =
          await response.json();

        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
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

const getStatusStep = (
  status: string
) => {
  switch (status) {
    case "Pending":
      return 1;

    case "Processing":
      return 2;

    case "Shipped":
      return 3;

    case "Delivered":
      return 4;

    default:
      return 1;
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

  if (
    status === "loading" ||
    loading
  ) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-black text-white pt-40 px-6">
          Loading...
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="font-serif text-6xl mb-10">
            My Account
          </h1>

          <div className="bg-zinc-900 rounded-3xl p-8 mb-10">

            <h2 className="text-3xl mb-6">
              Profile
            </h2>

            <p>
              <strong>Name:</strong>{" "}
              {session?.user?.name}
            </p>

            <p className="mt-2">
              <strong>Email:</strong>{" "}
              {session?.user?.email}
            </p>

            <p className="mt-2">
              <strong>Role:</strong>{" "}
              {(session?.user as any)
                ?.role || "customer"}
            </p>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl mb-6">
              My Orders
            </h2>

            {orders.length === 0 ? (
              <p className="text-zinc-400">
                No orders found.
              </p>
            ) : (
              <div className="space-y-10">

                {orders.map(
                  (order) => (
                    <div
                      key={order._id}
                      className="border border-zinc-800 rounded-3xl overflow-hidden"
                    >

                      {/* Header */}

                      <div className="bg-zinc-950 p-6 border-b border-zinc-800">

                        <div className="flex flex-wrap gap-4 justify-between">

                          <div>
                            <p className="text-zinc-400 text-sm">
                              ORDER ID
                            </p>

                            <p className="break-all">
                              {order._id}
                            </p>
                          </div>

                          <div>
                            <p className="text-zinc-400 text-sm">
                              ORDER DATE
                            </p>

                            <p>
                              {new Date(
                                order.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>

                          <div>
                            <p className="text-zinc-400 text-sm">
                              TOTAL
                            </p>

                            <p className="text-yellow-500 font-semibold">
                              ₹{order.total}
                            </p>
                          </div>

                        </div>

                        <div className="flex gap-3 mt-5 flex-wrap">

                          <span
                            className={`px-4 py-2 rounded-full text-sm ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>

                          <span
                            className={`px-4 py-2 rounded-full text-sm ${getPaymentColor(
                              order.paymentStatus
                            )}`}
                          >
                            Payment:{" "}
                            {
                              order.paymentStatus
                            }
                          </span>

                          {order.couponCode && (
                            <span className="px-4 py-2 rounded-full text-sm bg-purple-700">
                              Coupon:{" "}
                              {
                                order.couponCode
                              }
                            </span>
                          )}

                        </div>

                      </div>
{/* Timeline */}

<div className="p-6 border-b border-zinc-800">

  <h3 className="text-2xl mb-6">
    Order Progress
  </h3>

  <div className="flex justify-between items-center">

    {[
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
    ].map(
      (
        step,
        index
      ) => {
        const active =
          getStatusStep(
            order.status
          ) >=
          index + 1;

        return (
          <div
            key={step}
            className="flex flex-col items-center flex-1"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                active
                  ? "bg-green-600"
                  : "bg-zinc-700"
              }`}
            >
              {index + 1}
            </div>

            <p className="mt-2 text-sm text-center">
              {step}
            </p>
          </div>
        );
      }
    )}

  </div>

</div>
                      {/* Products */}

                      <div className="p-6">

                        <h3 className="text-2xl mb-6">
                          Ordered Items
                        </h3>

                        <div className="space-y-5">

                          {order.items?.map(
                            (
                              item: any
                            ) => (
                              <div
                                key={item.id}
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

                                  <h4 className="text-xl font-semibold">
                                    {
                                      item.name
                                    }
                                  </h4>

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

                      {/* Shipping */}

                      <div className="border-t border-zinc-800 p-6">

                        <h3 className="text-2xl mb-4">
                          Shipping Details
                        </h3>

                        <div className="bg-zinc-950 rounded-2xl p-5">

                          <p>
                            <strong>
                              Name:
                            </strong>{" "}
                            {
                              order.customer
                                ?.name
                            }
                          </p>

                          <p className="mt-2">
                            <strong>
                              Email:
                            </strong>{" "}
                            {
                              order.customer
                                ?.email
                            }
                          </p>

                          <p className="mt-2">
                            <strong>
                              Phone:
                            </strong>{" "}
                            {
                              order.customer
                                ?.phone
                            }
                          </p>

                          <p className="mt-2">
                            <strong>
                              City:
                            </strong>{" "}
                            {
                              order.customer
                                ?.city
                            }
                          </p>

                          <p className="mt-2">
                            <strong>
                              Address:
                            </strong>{" "}
                            {
                              order.customer
                                ?.address
                            }
                          </p>

                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          </div>

        </div>

      </main>
    </>
  );
}