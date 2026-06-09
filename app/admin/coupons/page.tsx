"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);

  const [code, setCode] = useState("");
  const [type, setType] =
    useState("percentage");

  const [value, setValue] =
    useState("");

  const [page, setPage] =
    useState("home");

  const [position, setPosition] =
    useState("hero");

  const [active, setActive] =
    useState(true);

  const [expiryDate, setExpiryDate] =
    useState("");

  const [usageLimit, setUsageLimit] =
    useState("");

  const [minimumOrder, setMinimumOrder] =
    useState("");

  const loadCoupons = async () => {
    const response =
      await fetch("/api/coupons");

    const data =
      await response.json();

    setCoupons(data);
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const createCoupon =
    async () => {
      if (
        !code ||
        !value
      ) {
        alert(
          "Fill all required fields"
        );
        return;
      }

      const coupon = {
        code:
          code.toUpperCase(),

        type,

        value:
          Number(value),

        active,

        expiryDate:
          expiryDate || null,

        usageLimit:
          usageLimit
            ? Number(
                usageLimit
              )
            : null,

        usedCount: 0,

        minimumOrder:
          minimumOrder
            ? Number(
                minimumOrder
              )
            : 0,

        display: {
          page,
          position,
        },
      };

      const response =
        await fetch(
          "/api/coupons",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              coupon
            ),
          }
        );

      const data =
        await response.json();

      if (data.success) {
        alert(
          "Coupon Created"
        );

        setCode("");
        setValue("");
        setExpiryDate("");
        setUsageLimit("");
        setMinimumOrder("");

        loadCoupons();
      }
    };

  const deleteCoupon =
    async (
      couponCode: string
    ) => {
      const confirmed =
        window.confirm(
          "Delete coupon?"
        );

      if (!confirmed)
        return;

      await fetch(
        "/api/coupons",
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            code:
              couponCode,
          }),
        }
      );

      loadCoupons();
    };
    const toggleCoupon =
  async (
    couponCode: string,
    active: boolean
  ) => {
    await fetch(
      "/api/coupons",
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          code:
            couponCode,
          active,
        }),
      }
    );

    loadCoupons();
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="font-serif text-6xl mb-10">
            Coupons
          </h1>

          <div className="bg-zinc-900 rounded-3xl p-8 mb-10">

            <h2 className="text-3xl mb-6">
              Create Coupon
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                placeholder="Coupon Code"
                value={code}
                onChange={(e) =>
                  setCode(
                    e.target.value
                  )
                }
                className="bg-black p-4 rounded-xl"
              />

              <input
                type="number"
                placeholder="Discount Value"
                value={value}
                onChange={(e) =>
                  setValue(
                    e.target.value
                  )
                }
                className="bg-black p-4 rounded-xl"
              />

              <select
                value={type}
                onChange={(e) =>
                  setType(
                    e.target.value
                  )
                }
                className="bg-black p-4 rounded-xl"
              >
                <option value="percentage">
                  Percentage
                </option>

                <option value="fixed">
                  Fixed Amount
                </option>
              </select>

              <input
                type="number"
                placeholder="Minimum Order Value"
                value={minimumOrder}
                onChange={(e) =>
                  setMinimumOrder(
                    e.target.value
                  )
                }
                className="bg-black p-4 rounded-xl"
              />

              <input
                type="number"
                placeholder="Usage Limit"
                value={usageLimit}
                onChange={(e) =>
                  setUsageLimit(
                    e.target.value
                  )
                }
                className="bg-black p-4 rounded-xl"
              />

              <input
                type="date"
                value={expiryDate}
                onChange={(e) =>
                  setExpiryDate(
                    e.target.value
                  )
                }
                className="bg-black p-4 rounded-xl"
              />

              <select
                value={page}
                onChange={(e) =>
                  setPage(
                    e.target.value
                  )
                }
                className="bg-black p-4 rounded-xl"
              >
                <option value="home">
                  Home
                </option>

                <option value="products">
                  Products
                </option>

                <option value="product">
                  Product Details
                </option>

                <option value="cart">
                  Cart
                </option>

                <option value="checkout">
                  Checkout
                </option>
              </select>

              <select
                value={position}
                onChange={(e) =>
                  setPosition(
                    e.target.value
                  )
                }
                className="bg-black p-4 rounded-xl"
              >
                <option value="hero">
                  Hero
                </option>

                <option value="top">
                  Top
                </option>

                <option value="middle">
                  Middle
                </option>

                <option value="bottom">
                  Bottom
                </option>
              </select>

              <label className="flex items-center gap-3 bg-black p-4 rounded-xl">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) =>
                    setActive(
                      e.target.checked
                    )
                  }
                />

                Active
              </label>

            </div>

            <button
              onClick={
                createCoupon
              }
              className="mt-6 bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold"
            >
              Create Coupon
            </button>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl mb-6">
              Existing Coupons
            </h2>

            <div className="space-y-4">

              {coupons.map(
                (coupon) => (
                  <div
                    key={
                      coupon._id
                    }
                    className="border-b border-zinc-800 pb-4 flex justify-between items-center"
                  >
                    <div>

                      <p className="font-semibold">
                        {
                          coupon.code
                        }
                      </p>

                      <p className="text-zinc-400">
                        {
                          coupon.type
                        }
                        {" - "}
                        {
                          coupon.value
                        }
                      </p>

                      <p className="text-zinc-500 text-sm">
                        Min Order: ₹
                        {
                          coupon.minimumOrder
                        }
                      </p>

                      <p className="text-zinc-500 text-sm">
                        Usage Limit:
                        {" "}
                        {
                          coupon.usageLimit ??
                          "Unlimited"
                        }
                      </p>
                      <p className="text-zinc-500 text-sm">
  Used:
  {" "}
  {coupon.usedCount || 0}
</p>

<p className="text-zinc-500 text-sm">
  Remaining:
  {" "}
  {coupon.usageLimit
    ? coupon.usageLimit -
      (coupon.usedCount || 0)
    : "Unlimited"}
</p>

<p className="text-zinc-500 text-sm">
  Status:
  {" "}
  <span
    className={
      coupon.active
        ? "text-green-500"
        : "text-red-500"
    }
  >
    {coupon.active
      ? "Active"
      : "Inactive"}
  </span>
</p>

                      <p className="text-zinc-500 text-sm">
  Expiry:
  {" "}
  {coupon.expiryDate
    ? new Date(
        coupon.expiryDate
      ).toLocaleDateString()
    : "No Expiry"}
</p>

<p className="text-zinc-500 text-sm">
  Expiry Status:
  {" "}
  <span
    className={
      coupon.expiryDate &&
      new Date(
        coupon.expiryDate
      ) < new Date()
        ? "text-red-500"
        : "text-green-500"
    }
  >
    {coupon.expiryDate &&
    new Date(
      coupon.expiryDate
    ) < new Date()
      ? "Expired"
      : "Valid"}
  </span>
</p>

                      <p className="text-zinc-500 text-sm">
                        {
                          coupon.display
                            ?.page
                        }
                        {" / "}
                        {
                          coupon.display
                            ?.position
                        }
                      </p>

                    </div>

                    <div className="flex gap-3">

  <button
    onClick={() =>
      toggleCoupon(
        coupon.code,
        !coupon.active
      )
    }
    className={`px-4 py-2 rounded-lg ${
      coupon.active
        ? "bg-orange-600"
        : "bg-green-600"
    }`}
  >
    {coupon.active
      ? "Disable"
      : "Enable"}
  </button>

  <button
    onClick={() =>
      deleteCoupon(
        coupon.code
      )
    }
    className="bg-red-600 px-4 py-2 rounded-lg"
  >
    Delete
  </button>

</div>

                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </main>
    </>
  );
}