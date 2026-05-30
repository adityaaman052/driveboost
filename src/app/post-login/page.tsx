"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  useAuth,
  useUser,
} from "@clerk/nextjs";

export default function PostLoginPage() {
  const router = useRouter();

  const { isLoaded, userId } =
    useAuth();

  const { user } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    if (!userId) {
      router.push("/sign-in");
      return;
    }

    fetch("/api/check-user")
      .then((res) => res.json())
      .then((data) => {
        if (!data.exists) {
          router.push("/select-role");
          return;
        }

        if (data.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/sales");
        }
      });
  }, [isLoaded, userId, router, user]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg font-semibold">
        Redirecting...
      </p>
    </div>
  );
}