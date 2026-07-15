"use client";

import dynamic from "next/dynamic";

const CartDrawer = dynamic(
  () => import("@/components/cart-drawer").then((m) => ({ default: m.CartDrawer })),
  { ssr: false }
);

export function CartDrawerWrapper() {
  return <CartDrawer />;
}
