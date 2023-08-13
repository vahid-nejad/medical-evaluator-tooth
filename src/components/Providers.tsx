"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import TariffProvider from "@/lib/context/TariffContext";
import TariffPriceProvider from "@/lib/context/TariffPriceContext";
interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <TariffProvider>
        <TariffPriceProvider>{children}</TariffPriceProvider>;
      </TariffProvider>
    </SessionProvider>
  );
};

export default Providers;
