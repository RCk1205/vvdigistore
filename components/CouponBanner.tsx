"use client";

import { useEffect, useState } from "react";

type Props = {
  page: string;
  position: string;
};

export default function CouponBanner({
  page,
  position,
}: Props) {
  const [coupons, setCoupons] =
    useState<any[]>([]);

  const copyCoupon = async (
    code: string
  ) => {
    try {
      await navigator.clipboard.writeText(
        code
      );

      alert(
        `Coupon ${code} copied`
      );
    } catch {
      alert(
        "Failed to copy coupon"
      );
    }
  };

  useEffect(() => {
    const loadCoupons =
      async () => {
        try {
          const response =
            await fetch(
              "/api/coupons"
            );

          const data =
            await response.json();

          const filtered =
            data.filter(
              (coupon: any) =>
                coupon.active ===
                  true &&
                coupon.display
                  ?.page ===
                  page &&
                coupon.display
                  ?.position ===
                  position
            );

          setCoupons(
            filtered
          );
        } catch (error) {
          console.error(
            error
          );
        }
      };

    loadCoupons();
  }, [page, position]);

  if (
    coupons.length === 0
  ) {
    return null;
  }

  return (
    <div className="bg-yellow-500 text-black py-4 px-6">

      <div className="max-w-7xl mx-auto space-y-3">

        {coupons.map(
          (
            coupon,
            index
          ) => (
            <div
              key={
                coupon._id ||
                index
              }
              className="flex flex-col md:flex-row items-center justify-between gap-3"
            >
              <div className="font-semibold text-center md:text-left">

                Use Coupon{" "}
                <span className="font-bold text-lg">
                  {
                    coupon.code
                  }
                </span>{" "}
                and get{" "}
                {coupon.type ===
                "percentage"
                  ? `${coupon.value}% OFF`
                  : `₹${coupon.value} OFF`}

              </div>

              <button
                onClick={() =>
                  copyCoupon(
                    coupon.code
                  )
                }
                className="bg-black text-yellow-500 px-5 py-2 rounded-xl font-semibold hover:opacity-90"
              >
                Copy Code
              </button>

            </div>
          )
        )}

      </div>

    </div>
  );
}