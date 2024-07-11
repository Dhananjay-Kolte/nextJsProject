import { redirect } from "next/navigation";
import VerifyAuth from "./_server_components/VerifyAuth";

const ADMIN_PAGE = "/pages/admin/dashboard";
const CUSTOMER_PAGE = "/pages/customer/dashboard";

export default async function Home(props: any) {
  await VerifyAuth({ returnUrl: CUSTOMER_PAGE });

  redirect(CUSTOMER_PAGE);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
