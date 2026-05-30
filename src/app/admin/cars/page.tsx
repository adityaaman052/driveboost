import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import AddCarForm from "@/components/admin/AddCarForm";

export default async function CarsPage() {
    const cars = await prisma.carModel.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold">
                Car Management
            </h1>
            <AddCarForm />
            <Card className="p-6">
                <div className="space-y-4">
                    {cars.map((car) => (

                        <div
                            key={car.id}
                            className="flex items-center justify-between rounded-lg border p-4"
                        >
                            <div>
                                <p className="font-semibold">
                                    {car.modelName}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {car.variant}
                                </p>
                            </div>

                            <form
                                action={`/api/cars/${car.id}`}
                                method="POST"
                            >
                                <button
                                    className="rounded-lg bg-red-500 px-3 py-1 text-white"
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    ))}

                    {cars.length === 0 && (
                        <p>No cars added yet.</p>
                    )}
                </div>
            </Card>
        </div>
    );
}