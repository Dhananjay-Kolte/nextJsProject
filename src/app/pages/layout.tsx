import DashboardLayout from "@/components/common/dashboard_layout";
import AuthenticatedRoute from "../_auth/AuthenticatedRoute";

export default async function Page({ children }: { children: React.ReactNode }) {
  return (
    <AuthenticatedRoute>
      <DashboardLayout activeRole={"Authenticated"}>
        {children}
      </DashboardLayout>

    </AuthenticatedRoute>
  )
}
