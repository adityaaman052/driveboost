import Link from "next/link";
import {
  LayoutDashboard,
  Car,
  IndianRupee,
  BarChart3,
} from "lucide-react";

const links = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Cars",
    href: "/admin/cars",
    icon: Car,
  },
  {
    label: "Slabs",
    href: "/admin/slabs",
    icon: IndianRupee,
  },
  {
    label: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
  },
];

export default function AdminSidebar() {
  return (
<div className="hidden md:flex h-screen w-64 flex-col border-r bg-linear-to-b from-white to-gray-100 p-5 shadow-lg">      <h1 className="mb-10 text-2xl font-bold">
        DriveBoost
      </h1>

      <div className="space-y-3">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-lg p-3 text-gray-700 hover:bg-gray-100"
            >
              <Icon size={20} />
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}