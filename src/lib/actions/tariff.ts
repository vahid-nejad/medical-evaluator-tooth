"use server";

import { Tariff, TariffPrice } from "@prisma/client";
import prisma from "../prisma";
import { TariffAndPrice } from "../context/TariffPriceContext";

export async function insertNewTariff(tariff: TariffAndPrice) {
  return await prisma.tariff.create({
    data: {
      ...tariff,
      prices: {
        create: [...tariff.prices],
      },
    },
  });
}

export async function searchTariffs(name: string) {
  return await prisma.tariff.findMany({
    where: {
      title: {
        contains: name,
      },
    },
  });
}

export async function findTariffs(id: number, year: number) {
  return await prisma.tariff.findUnique({
    where: {
      id,
    },
    include: {
      prices: {
        where: {
          year,
        },
      },
    },
  });
}
