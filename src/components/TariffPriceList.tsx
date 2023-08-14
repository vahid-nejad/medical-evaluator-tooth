import React, { ReactElement, useCallback, useMemo } from "react";
import { Button, Card, DataTable, DataTableHeader } from "./elements";
import { useTariffPriceContext } from "@/lib/context/TariffPriceContext";
import { TariffPrice } from "@prisma/client";
import { TrashIcon } from "@heroicons/react/24/solid";

type ItemsType = Omit<TariffPrice, "tariffId" | "generalPrice" | "specialistPrice"> & {
  radif: number;
  action: ReactElement;
  generalPrice: string;
  specialistPrice: string;
  id: number;
};

const headers: DataTableHeader<ItemsType>[] = [
  {
    value: "radif",
    text: "ردیف",
  },
  {
    value: "year",
    text: "سال",
  },
  {
    value: "generalPrice",
    text: "تعرفه عمومی",
  },
  {
    value: "specialistPrice",
    text: "تعرفه متخصص",
  },
  {
    value: "action",
    text: "عملیات",
  },
];

const TariffPriceList = () => {
  const { tariffPrices, removeTariffPrice } = useTariffPriceContext();
  //   const createItemsCallback:
  const items: ItemsType[] = useMemo(
    () =>
      tariffPrices.map(
        (tariffPrice, index): ItemsType => ({
          id: tariffPrice.year,
          radif: index + 1,
          generalPrice: tariffPrice.generalPrice.toLocaleString(),
          specialistPrice: tariffPrice.specialistPrice.toLocaleString(),
          year: tariffPrice.year,
          action: (
            <Button variant="outline-danger" onClick={() => removeTariffPrice(tariffPrice.year)}>
              <TrashIcon className="w-4" />
            </Button>
          ),
        })
      ),
    [tariffPrices]
  );

  return (
    <Card>
      <DataTable headers={headers} items={items} />
    </Card>
  );
};

export default TariffPriceList;
