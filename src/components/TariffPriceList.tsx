import React, { ReactElement, useCallback, useMemo } from "react";
import { Button, Card, DataTable, DataTableHeader } from "./elements";
import { useTariffPriceContext } from "@/lib/context/TariffPriceContext";
import { TariffPrice } from "@prisma/client";
import { TrashIcon } from "@heroicons/react/24/solid";

type ItemsType = Omit<TariffPrice, "tariffId"> & {
  radif: number;
  action: ReactElement;
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
          radif: index + 1,
          generalPrice: tariffPrice.generalPrice,
          specialistPrice: tariffPrice.specialistPrice,
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
