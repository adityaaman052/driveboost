import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete old data
  await prisma.salesEntry.deleteMany();

  await prisma.incentiveSlab.deleteMany();

  await prisma.carModel.deleteMany();

  // Create realistic Toyota cars
  await prisma.carModel.createMany({
    data: [
      {
        modelName:
          "Toyota Fortuner",

        variant: "GR-S",

        baseSuffix: "SUV",
      },

      {
        modelName:
          "Toyota Innova Hycross",

        variant: "ZX(O)",

        baseSuffix: "MPV",
      },

      {
        modelName:
          "Toyota Urban Cruiser Hyryder",

        variant: "V Hybrid",

        baseSuffix: "SUV",
      },

      {
        modelName:
          "Toyota Glanza",

        variant: "G AMT",

        baseSuffix: "Hatchback",
      },

      {
        modelName:
          "Toyota Hilux",

        variant: "High AT",

        baseSuffix: "Pickup",
      },
    ],
  });

  // Create incentive slabs
  await prisma.incentiveSlab.createMany({
    data: [
      {
        minRange: 1,
        maxRange: 3,
        incentivePerCar: 1000,
      },

      {
        minRange: 4,
        maxRange: 7,
        incentivePerCar: 2500,
      },

      {
        minRange: 8,
        maxRange: null,
        incentivePerCar: 5000,
      },
    ],
  });

  console.log(
    "🌱 Cars and slabs seeded successfully!"
  );
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });