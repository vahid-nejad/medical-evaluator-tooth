import { PriceType, TariffAndPrice, useTariffContext } from "@/lib/context/TariffContext";
import { ReactElement, useMemo } from "react";
import { Button, DataTable, DataTableHeader } from "./elements";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Tariff } from "@prisma/client";

type ItemsType = Omit<Tariff, "criteria"> & {
  radif: number;
  action: ReactElement;
  price: number;
};

type Props = {
  priceType: PriceType;
};

const headers: DataTableHeader<ItemsType>[] = [
  {
    text: "ردیف",
    value: "radif",
  },
  {
    text: "کد",
    value: "code",
  },
  {
    text: "عنوان",
    value: "title",
  },
  {
    text: "تعرفه",
    value: "price",
  },
  {
    text: "عملیات",
    value: "action",
  },
];

const TariffList = (props: Props) => {
  const { tariffs, removeTariff, finalPrice } = useTariffContext();
  const items: ItemsType[] = useMemo(
    () =>
      tariffs.map(
        (tariff, index): ItemsType => ({
          id: tariff.id,
          radif: index + 1,
          code: tariff.tariff.code,
          price: tariff.tariff.prices[0][props.priceType],
          title: tariff.tariff.title,
          action: (
            <Button variant="outline-danger" onClick={() => removeTariff(tariff.id)}>
              <TrashIcon className="w-4" />
            </Button>
          ),
        })
      ),
    [tariffs]
  );

  return (
    <div className="shadow border rounded-md">
      <div className="flex gap-2 p-2 bg-gradient-to-b from-emerald-500 to-emerald-700 text-white md:text-2lg text-lg">
        <p>جمع کل:</p>
        <p>{finalPrice(props.priceType).toLocaleString()}</p>
      </div>
      <DataTable items={items} headers={headers} />
    </div>
  );
};

export default TariffList;
