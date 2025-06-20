"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const savePrivateKey = async (pk: string) => {
  (await cookies()).set("pk", pk);
};

export const logout = async () => {
  (await cookies()).delete("pk");
  redirect("/");
};
