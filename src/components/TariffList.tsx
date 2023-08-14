import { PriceType, TariffAndPrice, useTariffContext } from "@/lib/context/TariffContext";
import { ReactElement, useMemo } from "react";
import { Button, DataTable, DataTableHeader } from "./elements";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Tariff } from "@prisma/client";
import clsx from "clsx";

type ItemsType = Omit<Tariff, "criteria"> & {
  rowIndex: number;
  action: ReactElement;
  price: string;
};

type Props = {
  priceType: PriceType;
  year: number;
};

const TariffList = (props: Props) => {
  const { tariffs, removeTariff, finalPrice } = useTariffContext();
  const headers: DataTableHeader<ItemsType>[] = useMemo(
    () => [
      {
        text: "ردیف",
        value: "rowIndex",
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
        text: props.priceType === "generalPrice" ? "تعرفه عمومی" : "تعرفه متخصص",
        value: "price",
      },
      {
        text: "عملیات",
        value: "action",
      },
    ],
    [props.priceType]
  );
  const items: ItemsType[] = useMemo(
    () =>
      tariffs.map(
        (tariff, index): ItemsType => ({
          id: tariff.id,
          rowIndex: index + 1,
          code: tariff.tariff.code,
          price: tariff.tariff.prices[0][props.priceType].toLocaleString(),
          title: tariff.tariff.title,
          action: (
            <Button variant="outline-danger" onClick={() => removeTariff(tariff.id)}>
              <TrashIcon className="w-4" />
            </Button>
          ),
        })
      ),
    [tariffs, props.priceType]
  );

  return (
    <div className="shadow border rounded-md">
      <div className="flex gap-2 p-4 bg-gradient-to-b from-emerald-500 to-emerald-700 text-white md:text-2xl text-xl">
        <p>
          جمع کل (<span className={"font-bold text-teal-200"}>{props.year}</span>)
          <span
            className={clsx(
              {
                "text-yellow-300": props.priceType === "generalPrice",
                "text-rose-200": props.priceType === "specialistPrice",
              },
              "font-bold"
            )}
          >
            {props.priceType === "generalPrice"
              ? " تعرفه عمومی"
              : props.priceType === "specialistPrice"
              ? " تعرفه متخصص"
              : ""}
          </span>{" "}
          :
        </p>
        <p>{finalPrice(props.priceType).toLocaleString()}</p>
      </div>
      <DataTable items={items} headers={headers} />
    </div>
  );
};

export default TariffList;
