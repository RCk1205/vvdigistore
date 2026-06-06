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
              <div className="space-y-6">

                {orders.map(
                  (order) => (
                    <div
                      key={
                        order._id
                      }
                      className="border border-zinc-800 rounded-2xl p-6"
                    >
                      <p>
                        <strong>
                          Order ID:
                        </strong>{" "}
                        {order._id}
                      </p>

                      <p>
                        <strong>
                          Status:
                        </strong>{" "}
                        {
                          order.status
                        }
                      </p>

                      <p>
                        <strong>
                          Payment:
                        </strong>{" "}
                        {
                          order.paymentStatus
                        }
                      </p>

                      <p>
                        <strong>
                          Total:
                        </strong>{" "}
                        ₹
                        {
                          order.total
                        }
                      </p>

                      <p>
                        <strong>
                          Date:
                        </strong>{" "}
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>
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