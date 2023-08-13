"use client";
import { Form } from "@/components/elements/Form";
import { FormHeader } from "../components/elements/FormHeader";
import TarrifFinder from "@/components/TarrifFinder";
import { useForm } from "react-hook-form";
import { Tariff } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/Button";
import { PlusIcon } from "@heroicons/react/24/solid";
import TariffList from "@/components/TariffList";
import { TariffAndPrice, useTariffContext } from "@/lib/context/TariffContext";

export default function Home() {
  const [tariff, setTariff] = useState<TariffAndPrice>();
  const { addTariff } = useTariffContext();

  const add = () => {
    if (tariff) addTariff({ ...tariff });
  };

  return (
    <>
      <Form className="m-2">
        <FormHeader>محاسبه تعرفه دندان</FormHeader>
        <div className="flex"></div>
        <div className=" grid grid-cols-1 md:grid-cols-4 p-2 gap-2 items-center ">
          <TarrifFinder onChange={(tariff) => setTariff(tariff)} />
          <Button className="text-center" onClick={add}>
            <PlusIcon className="w-4" />
          </Button>
        </div>
      </Form>

      <TariffList priceType="generalPrice" />
    </>
  );
}
