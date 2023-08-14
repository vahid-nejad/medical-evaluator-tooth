"use client";
import { Form } from "@/components/elements/Form";
import { FormHeader } from "../components/elements/FormHeader";
import TarrifFinder from "@/components/TarrifFinder";
import { useForm } from "react-hook-form";
import { Tariff } from "@prisma/client";
import { useRef, useState } from "react";
import { Button } from "@/components/Button";
import { PlusIcon } from "@heroicons/react/24/solid";
import TariffList from "@/components/TariffList";
import { PriceType, TariffAndPrice, useTariffContext } from "@/lib/context/TariffContext";
import { AutoCompleteOption, NumberInput, Select } from "@/components/elements";
import { findTariffs } from "@/lib/actions/tariff";

const tariffOptions: AutoCompleteOption<PriceType>[] = [
  {
    name: "عمومی",
    value: "generalPrice",
  },
  {
    name: "متخصص",
    value: "specialistPrice",
  },
];

export default function Home() {
  const [tariff, setTariff] = useState<TariffAndPrice>();
  const { addTariff } = useTariffContext();
  const [year, setYear] = useState(1402);
  const [priceType, setPriceType] = useState<PriceType>();

  const handleChangeYear = async (val: number) => {
    setYear(val);
    if (tariff) {
      const refreshedTariff = await findTariffs(tariff.id, val);
      if (refreshedTariff) setTariff(refreshedTariff);
    }
  };

  const add = () => {
    if (!tariff?.prices.length) {
      alert(`برای سال ${year} برای خدمات تعرفه ای ثبت نشده`);
      return;
    }

    if (!priceType) {
      alert(`نوع تعرفه را تعریف کنید`);
      return;
    }
    if (tariff) addTariff({ ...tariff });
  };

  return (
    <>
      <Form className="m-2">
        <FormHeader>تنظیمات محاسبخ</FormHeader>
        <div className="grid grid-cols-2 gap-2 p-2">
          <NumberInput
            labelText="تعرفه سال"
            initialvalue={1402}
            separator={false}
            onChange={handleChangeYear}
          />
          <Select
            options={tariffOptions}
            labelText="نوع تعرفه"
            onChange={(e) => setPriceType(e.value)}
          />
        </div>
      </Form>
      <Form className="m-2">
        <FormHeader>محاسبه تعرفه دندان</FormHeader>

        <div className=" grid grid-cols-1 md:grid-cols-4 p-2 gap-2 items-end ">
          <TarrifFinder year={year} onChange={(tariff) => setTariff(tariff)} />
          <Button className="text-center h-11 flex justify-center items-center w-24" onClick={add}>
            <PlusIcon className="w-4" />
          </Button>
        </div>
      </Form>

      {!!priceType && <TariffList priceType={priceType} year={year} />}
    </>
  );
}
