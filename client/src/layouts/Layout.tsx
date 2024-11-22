import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from "react";
import AppSidebar from "./AppSidebar";

NProgress.configure({
    minimum: 0.2,
    showSpinner: false,
    easing: 'ease',
    trickle: true,
    trickleSpeed: 100,
    parent: '#root',
});

export default function Layout() {
    const location = useLocation();

    useEffect(() => {
        const handleStart = () => (NProgress as any).start();
        const handleDone = () => (NProgress as any).done();

        handleStart();
        handleDone();
    }, [location]);

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
                        <div className="py-3 relative w-full">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </main>
        </SidebarProvider>
    );
}
