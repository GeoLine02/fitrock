import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeRegistry from "./_components/ThemeRegistry";
import { AdminUserProvider } from "./_lib/AdminUserProvider";
import SideMenu from "./_components/sideMenu/SideMenu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeRegistry>
      <AdminUserProvider>
        <div className="flex min-h-screen w-full">
          <SideMenu />
          <main className="flex-1 p-4 overflow-auto">{children}</main>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="dark"
          />
        </div>
      </AdminUserProvider>
    </ThemeRegistry>
  );
}
