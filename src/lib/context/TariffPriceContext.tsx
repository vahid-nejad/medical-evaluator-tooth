"use client";
import { Tariff, TariffPrice } from "@prisma/client";

import { ReactNode, createContext, useContext, useState } from "react";
export type TariffAndPrice = Tariff & {
  prices: TariffPrice[];
};

export class YearDuplicatedError extends Error {}

type TariffPriceContextType = {
  tariffPrices: TariffPrice[];

  addTariffPrice: (tariff: TariffPrice) => void;
  removeTariffPrice: (year: number) => void;
};

const TariffPriceContext = createContext<TariffPriceContextType | null>(null);

type Props = {
  children: ReactNode;
};
const TariffPriceProvider = ({ children }: Props) => {
  const [tariffPrices, setTariffPrices] = useState<TariffPrice[]>([]);

  const addTariffPrice = (tariffPrice: TariffPrice) => {
    if (tariffPrices.find((el) => el.year === tariffPrice.year)) throw new YearDuplicatedError();
    setTariffPrices([...tariffPrices, tariffPrice]);
  };
  const removeTariffPrice = (year: number) => {
    const newTariffPrices = tariffPrices.filter((tariffPrice) => tariffPrice.year !== year);
    setTariffPrices([...newTariffPrices]);
  };

  return (
    <TariffPriceContext.Provider
      value={{ tariffPrices: tariffPrices, addTariffPrice, removeTariffPrice }}
    >
      {children}
    </TariffPriceContext.Provider>
  );
};

export const useTariffPriceContext = () => {
  return useContext(TariffPriceContext) as TariffPriceContextType;
};

export default TariffPriceProvider;
