import { Tariff, TariffPrice } from "@prisma/client";
import { ReactNode, createContext, useContext, useState } from "react";
export type TariffAndPrice = Tariff & {
  prices: TariffPrice[];
};

type TariffContext = {
  id: number;
  tariff: TariffAndPrice;
};

type TariffContextType = {
  tariffs: TariffContext[];

  addTariff: (tariff: TariffAndPrice) => void;
  removeTariff: (id: number) => void;
  finalPrice: (priceType: PriceType) => number;
};

export type PriceType = keyof Pick<TariffPrice, "generalPrice" | "specialistPrice">;

const TariffContext = createContext<TariffContextType | null>(null);

type Props = {
  children: ReactNode;
};
const TariffProvider = ({ children }: Props) => {
  const [tariffs, setTariffs] = useState<TariffContext[]>([]);

  const addTariff = (tariff: TariffAndPrice) => {
    const newTarriffContext: TariffContext = {
      tariff,
      id: new Date().getTime(),
    };
    setTariffs([...tariffs, newTarriffContext]);
  };
  const removeTariff = (id: number) => {
    const newTariffs = tariffs.filter((tariff) => tariff.id !== id);
    setTariffs([...newTariffs]);
  };

  const finalPrice = (priceType: PriceType) =>
    tariffs.reduce((total, crr) => total + crr.tariff.prices[0][priceType], 0);

  return (
    <TariffContext.Provider value={{ tariffs, addTariff, removeTariff, finalPrice }}>
      {children}
    </TariffContext.Provider>
  );
};

export const useTariffContext = () => {
  return useContext(TariffContext) as TariffContextType;
};

export default TariffProvider;
