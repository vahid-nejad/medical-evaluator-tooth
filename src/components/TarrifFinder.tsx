"use client";
import React, { useRef, useState, useTransition } from "react";
import { TextBox } from "./elements/TextBox";
import { Button } from "./elements";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Tariff } from "@prisma/client";
import clsx from "clsx";
import { findTariffs, searchTariffs } from "@/lib/actions/tariff";
import { TariffAndPrice } from "@/lib/context/TariffContext";

type Props = {
  onChange: (tariff: TariffAndPrice) => void;
  value?: Tariff;
  year: number;
};

const TarrifFinder = (props: Props) => {
  const title = useRef("");
  const [isPending, startTransition] = useTransition();
  const [tariffs, setTariffs] = useState<Tariff[]>();
  const [selectedTariff, setSelectedTariff] = useState<Tariff>();
  const find = async () => {
    setTariffs(await searchTariffs(title.current));
  };
  const selectTariff = async (tariff: Tariff) => {
    console.log(props.year);

    setTariffs([]);
    setSelectedTariff(tariff);
    const tariffAndPrice = await findTariffs(tariff.id, props.year);
    if (tariffAndPrice) props.onChange(tariffAndPrice);
  };

  return (
    <>
      <div className="relative">
        <TextBox onChange={(e) => (title.current = e.target.value)} labelText="عنوان">
          <Button square className="rounded-l-md" onClick={() => startTransition(find)}>
            <MagnifyingGlassIcon className="w-4" />
          </Button>
        </TextBox>
        <TariffList tariffs={tariffs} onSelect={selectTariff} />
      </div>
      <TextBox readOnly labelText="کد" value={selectedTariff?.code} />
    </>
  );
};

type TariffListProps = {
  tariffs?: Tariff[];
  onSelect: (tarif: Tariff) => void;
};
const TariffList = (props: TariffListProps) => {
  return (
    <div
      className={clsx(
        "absolute -bottom-10 max-h-32 shadow w-36 bg-white rounded-md text-center p-2",
        {
          hidden: !props.tariffs || !props.tariffs.length,
        }
      )}
    >
      {props.tariffs &&
        props.tariffs.map((tariff) => (
          <TariffElement key={tariff.id} tariff={tariff} onSelect={props.onSelect} />
        ))}
    </div>
  );
};

type TariffElementProps = {
  tariff: Tariff;
  onSelect: (tarif: Tariff) => void;
};
const TariffElement = (props: TariffElementProps) => (
  <div
    className="py-2 cursor-pointer odd:bg-slate-100 hover:bg-emerald-600 hover:text-white transition"
    onClick={() => props.onSelect(props.tariff)}
  >
    {props.tariff.title}
  </div>
);

export default TarrifFinder;
