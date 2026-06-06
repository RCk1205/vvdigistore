"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { useSession } from "next-auth/react";

type WishlistItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  addToWishlist: (
    product: WishlistItem
  ) => void;
  removeFromWishlist: (
    id: number
  ) => void;
};

const WishlistContext =
  createContext<
    WishlistContextType | undefined
  >(undefined);

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session } =
    useSession();

  const [wishlist, setWishlist] =
    useState<WishlistItem[]>([]);

  const wishlistKey =
    session?.user?.email
      ? `wishlist_${session.user.email}`
      : "wishlist_guest";

  useEffect(() => {
    const saved =
      localStorage.getItem(
        wishlistKey
      );

    if (saved) {
      setWishlist(
        JSON.parse(saved)
      );
    } else {
      setWishlist([]);
    }
  }, [wishlistKey]);

  useEffect(() => {
    localStorage.setItem(
      wishlistKey,
      JSON.stringify(
        wishlist
      )
    );
  }, [wishlist, wishlistKey]);

  const addToWishlist = (
    product: WishlistItem
  ) => {
    setWishlist((prev) => {
      const exists =
        prev.find(
          (item) =>
            item.id === product.id
        );

      if (exists)
        return prev;

      return [
        ...prev,
        product,
      ];
    });
  };

  const removeFromWishlist = (
    id: number
  ) => {
    setWishlist((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context =
    useContext(
      WishlistContext
    );

  if (!context) {
    throw new Error(
      "useWishlist must be used within WishlistProvider"
    );
  }

  return context;
}