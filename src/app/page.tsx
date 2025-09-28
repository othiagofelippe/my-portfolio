import { defaultLocale } from "@/src/lib/i18n";
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
