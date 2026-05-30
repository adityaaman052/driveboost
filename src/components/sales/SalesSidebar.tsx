import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { getCurrentUser } from "@/lib/getCurrentUser";

import {
  LayoutDashboard,
} from "lucide-react";

const links = [
  {
    label: "Sales Dashboard",
    href: "/sales",
    icon: LayoutDashboard,
  },
];

export default async function SalesSidebar() {
  const user = await getCurrentUser();

  return (
    <div className="hidden md:flex min-h-screen w-64 flex-col border-r bg-linear-to-b from-white to-gray-100 p-5 shadow-lg">

      <h1 className="mb-10 text-2xl font-bold">
        DriveBoost
      </h1>

      <div className="space-y-3">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-lg p-3 text-gray-700 transition hover:bg-gray-200"
            >
              <Icon size={20} />
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto border-t pt-5">
        <div className="mb-4">
          <p className="font-semibold">
            {user?.name}
          </p>

          <p className="text-sm text-gray-500">
            {user?.role}
          </p>
        </div>

        <UserButton />
      </div>
    </div>
  );
}