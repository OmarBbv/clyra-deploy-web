import { Outlet } from 'react-router-dom';
import Navbar from '@/layouts/Navbar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

const Layout = () => {
  return (
    <SidebarProvider>
            <AppSidebar />
            <main className="w-full flex-1 p-4 h-dvh">
                <div className="flex-1 h-full w-full">
                    <div className="flex items-start gap-2 relative">
                        <SidebarTrigger />
                        <Navbar />
                    </div>
                    <div className="w-full flex-1">
                        <div className="py-3 pb-6 relative w-full">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </main>
        </SidebarProvider>
  );
}

export default Layout;
