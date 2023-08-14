import { TariffPrice } from "@prisma/client";
import React from "react";
import { ConfirmButtons, Form, FormHeader, Modal, NumberInput } from "./elements";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { YearDuplicatedError, useTariffPriceContext } from "@/lib/context/TariffPriceContext";
type Props = {
  show: boolean;
  onClose: () => void;
};

type Inputs = TariffPrice;

const ERROR_MESSAGE = "لطفا این قسمت را تکمیل کنید";

const DefinePrice = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const { addTariffPrice } = useTariffPriceContext();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log({ data });

    try {
      addTariffPrice(data);
      reset();
      props.onClose();
    } catch (YearDuplicatedError) {
      setError("year", { message: "سال تکراری است" });
    }
  };

  return (
    <Modal show={props.show} onClose={props.onClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader>تعریف تعرفه برای سال</FormHeader>
        <div className="grid cols-1 md:grid-cols-3 p-2 gap-2">
          <Controller
            name="year"
            control={control}
            rules={{ required: true, min: 1400 }}
            render={({ field }) => (
              <NumberInput
                {...field}
                labelText="سال"
                separator={false}
                // initialvalue={1402}
                error={errors.year && (errors.year.message ? errors.year.message : ERROR_MESSAGE)}
              />
            )}
          />
          <Controller
            name="generalPrice"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <NumberInput
                {...field}
                labelText="تعرفه عمومی"
                error={errors.generalPrice && ERROR_MESSAGE}
              />
            )}
          />{" "}
          <Controller
            name="specialistPrice"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <NumberInput
                {...field}
                labelText="تعرفه متخصص"
                error={errors.specialistPrice && ERROR_MESSAGE}
              />
            )}
          />
          <ConfirmButtons submit className="md:col-span-3" onCancel={props.onClose} />
        </div>
      </Form>
    </Modal>
  );
};

export default DefinePrice;
