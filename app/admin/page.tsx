"use client";

import Navbar from "../../components/Navbar";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminPage() {
const [products, setProducts] =
  useState<any[]>([]);

const [orders, setOrders] =
  useState<any[]>([]);

const [coupons, setCoupons] =
  useState<any[]>([]);

const [users, setUsers] =
  useState<any[]>([]);

const [subscribers, setSubscribers] =
  useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

 const loadData = async () => {
  try {
    const productsRes =
      await fetch("/api/products");

    const ordersRes =
      await fetch("/api/orders");

    const couponsRes =
      await fetch("/api/coupons");

    const usersRes =
      await fetch("/api/signup");

    const subscribersRes =
      await fetch("/api/newsletter");

    const productsData =
      productsRes.ok
        ? await productsRes.json()
        : [];

    const ordersData =
      ordersRes.ok
        ? await ordersRes.json()
        : [];

    const couponsData =
      couponsRes.ok
        ? await couponsRes.json()
        : [];

    const usersData =
      usersRes.ok
        ? await usersRes.json()
        : [];

    const subscribersData =
      subscribersRes.ok
        ? await subscribersRes.json()
        : [];

    setProducts(productsData || []);
    setOrders(ordersData || []);
    setCoupons(couponsData || []);
    setUsers(usersData || []);
    setSubscribers(
      subscribersData || []
    );
  } catch (error) {
    console.error(
      "Dashboard Load Error:",
      error
    );
  }
};



  const totalRevenue =
    orders.reduce(
      (
        total,
        order
      ) =>
        total +
        Number(
          order.total || 0
        ),
      0
    );

  const lowStockCount =
    products.filter(
      (product) =>
        (product.stock ??
          0) <= 10
    ).length;
    const salesMap: Record<
  string,
  number
> = {};

orders.forEach(
  (order) => {
    order.items?.forEach(
      (item: any) => {
        salesMap[item.name] =
          (salesMap[
            item.name
          ] || 0) +
          item.quantity;
      }
    );
  }
);

const bestSellingProducts =
  Object.entries(
    salesMap
  )
    .sort(
      (a, b) =>
        b[1] - a[1]
    )
    .slice(0, 5);

const topProduct =
  bestSellingProducts.length > 0
    ? bestSellingProducts[0]
    : null;

const conversionRate =
  users.length === 0
    ? 0
    : Math.round(
        (orders.length /
          users.length) *
          100
      );
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="font-serif text-6xl mb-10">
            Admin Dashboard
          </h1>

          {/* Analytics */}

          
<div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6 mb-12">
              <div className="bg-zinc-900 rounded-3xl p-6">
              <p className="text-zinc-400">
                Products
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {products.length}
              </h2>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-6">
              <p className="text-zinc-400">
                Orders
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {orders.length}
              </h2>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-6">
              <p className="text-zinc-400">
                Revenue
              </p>

              <h2 className="text-4xl font-bold mt-2 text-yellow-500">
                ₹
                {totalRevenue.toLocaleString()}
              </h2>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-6">
              <p className="text-zinc-400">
                Low Stock
              </p>

              <h2 className="text-4xl font-bold mt-2 text-orange-400">
                {lowStockCount}
              </h2>
            </div>

          </div>
          <div className="bg-zinc-900 rounded-3xl p-6">

  <p className="text-zinc-400">
    Customers
  </p>

  <h2 className="text-4xl font-bold mt-2 text-cyan-400">
    {users.length}
  </h2>

</div>

<div className="bg-zinc-900 rounded-3xl p-6">

  <p className="text-zinc-400">
    Subscribers
  </p>

  <h2 className="text-4xl font-bold mt-2 text-purple-400">
    {subscribers.length}
  </h2>

</div>

          {/* Management */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <Link
              href="/admin/products"
              className="bg-zinc-900 p-10 rounded-3xl hover:bg-zinc-800 transition"
            >
              <h2 className="text-3xl mb-4">
                Products
              </h2>

              <p className="text-zinc-400">
                Add, edit and manage products.
              </p>
            </Link>

            <Link
              href="/admin/orders"
              className="bg-zinc-900 p-10 rounded-3xl hover:bg-zinc-800 transition"
            >
              <h2 className="text-3xl mb-4">
                Orders
              </h2>

              <p className="text-zinc-400">
                View and manage customer orders.
              </p>
            </Link>

            <Link
              href="/admin/coupons"
              className="bg-zinc-900 p-10 rounded-3xl hover:bg-zinc-800 transition"
            >
              <h2 className="text-3xl mb-4">
                Coupons
              </h2>

              <p className="text-zinc-400">
                Create, manage and display coupons.
              </p>
            </Link>

          </div>
<div className="bg-zinc-900 rounded-3xl p-8 mb-12">

  <h2 className="text-3xl mb-6">
    Best Selling Products
  </h2>

  {bestSellingProducts.length === 0 ? (
    <p className="text-zinc-400">
      No sales data available.
    </p>
  ) : (
    <>
      <div className="bg-black rounded-2xl p-5 mb-6">

        <p className="text-zinc-400">
          Top Product
        </p>

        <h3 className="text-2xl font-semibold text-yellow-500 mt-2">
       {topProduct?.[0]}
        </h3>

        <p className="mt-2">
          Units Sold:
          {" "}
         {topProduct?.[1]}
        </p>

      </div>

      <div className="space-y-3">

        {bestSellingProducts.map(
          (
            product,
            index
          ) => (
            <div
              key={
                product[0]
              }
              className="bg-black rounded-xl p-4 flex justify-between"
            >

              <span>
                #{index + 1}
                {" "}
                {
                  product[0]
                }
              </span>

              <span className="text-yellow-500">
                {
                  product[1]
                }
                {" "}
                sold
              </span>

            </div>
          )
        )}

      </div>
    </>
  )}

</div>
          {/* Quick Insights */}

<div className="mt-12 bg-zinc-900 rounded-3xl p-8">

  <h2 className="text-3xl mb-6">
    Store Insights
  </h2>

  <div className="space-y-3 mb-8">

    <p>
      Total Coupons:
      {" "}
      {coupons.length}
    </p>

    <p>
      Active Coupons:
      {" "}
      {
        coupons.filter(
          (
            coupon
          ) =>
            coupon.active
        ).length
      }
    </p>
    <p>
  Customer Conversion:
  {" "}
  {conversionRate}%
</p>

    <p>
      Out Of Stock Products:
      {" "}
      {
        products.filter(
          (
            product
          ) =>
            (product.stock ??
              0) <= 0
        ).length
      }
    </p>

  </div>

  <div className="border-t border-zinc-800 pt-6">

    <h3 className="text-2xl mb-4">
      Inventory Alerts
    </h3>

    {products.filter(
      (product) =>
        (product.stock ??
          0) <= 10
    ).length === 0 ? (
      <p className="text-green-500">
        No inventory alerts.
      </p>
    ) : (
      <div className="space-y-3">

        {products
          .filter(
            (
              product
            ) =>
              (product.stock ??
                0) <= 10
          )
          .map(
            (
              product
            ) => (
              <div
                key={
                  product.id
                }
                className="bg-black rounded-xl p-4"
              >

                <p className="font-semibold">
                  {
                    product.name
                  }
                </p>

                {(product.stock ??
                  0) <=
                0 ? (
                  <p className="text-red-500">
                    Out Of Stock
                  </p>
                ) : (
                  <p className="text-orange-400">
                    Only {
                      product.stock
                    } Left
                  </p>
                )}

              </div>
            )
          )}

      </div>
    )}

  </div>

</div>

          <button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            className="mt-12 bg-red-600 px-6 py-3 rounded-xl"
          >
            Logout
          </button>

        </div>

      </main>
    </>
  );
}