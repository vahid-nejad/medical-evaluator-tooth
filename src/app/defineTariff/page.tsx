"use client";
import DefinePrice from "@/components/DefinePrice";
import TariffPriceList from "@/components/TariffPriceList";
import { TextBox } from "@/components/TextBox";
import { Button, ConfirmButtons, NumberInput, TextArea } from "@/components/elements";
import { insertNewTariff } from "@/lib/actions/tariff";
import { TariffAndPrice, useTariffPriceContext } from "@/lib/context/TariffPriceContext";
import { Tariff } from "@prisma/client";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = Tariff;

const ERROR_MESSAGE = "لطفا این قسمت را تکمیل کنید";

const DefineTariffPage = () => {
  const [showDefinePrice, setShowDefinePrice] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const { tariffPrices } = useTariffPriceContext();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const tariffAndPrice: TariffAndPrice = {
      ...data,
      prices: tariffPrices,
    };
    insertNewTariff(tariffAndPrice);
  };
  return (
    <>
      <div className="m-2 rounded-md shadow border">
        <h1 className="text-center text-2xl text-slate-700 bg-gradient-to-b from-slate-50 to-slate-200">
          تعریف تعرفه جدید
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-2 grid grid-cols-1 md:grid-cols-4 gap-3 justify-start"
        >
          <TextBox {...register("code")} labelText="کد" />
          <TextBox {...register("title")} labelText="عنوان" />
          <Button className="place-self-end" onClick={() => setShowDefinePrice(true)}>
            تعریف تعرفه برای سال
          </Button>

          <TextArea {...register("criteria")} labelText="ضوابط" className="md:col-span-4" />
          <ConfirmButtons submit className="md:col-span-4" />
        </form>
        <DefinePrice show={showDefinePrice} onClose={() => setShowDefinePrice(false)} />
      </div>
      <TariffPriceList />
    </>
  );
};

export default DefineTariffPage;
