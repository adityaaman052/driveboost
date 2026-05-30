import SalesSidebar from "@/components/sales/SalesSidebar";

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SalesSidebar />

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}