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
    <div className="bg-yellow-500 text-black py-4 px-6 text-center font-semibold">

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
          >
            Use Coupon{" "}
            <span className="font-bold">
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
        )
      )}

    </div>
  );
}