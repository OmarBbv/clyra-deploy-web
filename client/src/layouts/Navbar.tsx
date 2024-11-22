import UserAvatar from "@/components/Avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchPopup from "@/components/SearchPopup";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";
import useAuth from "@/auth/auth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/contexts/UserProvider";
import { Bell, LogIn, LogOut, User } from "lucide-react";


const Navbar = () => {
    const nav = useNavigate();
    const { logout } = useAuth();
    const { toast } = useToast();
    const { userInfo } = useUser();

    const mutate = useMutation({
        mutationKey: ['post/logout'],
        mutationFn: async () => {
            toast({ title: 'Çıkış Yapılıyor', description: 'Biraz Bekleyin' });
            logout();
        },
        onSuccess: () => toast({ title: 'Başarılı', description: 'Çıkış başarılı' }),
        onError: () => toast({ title: 'Hata', description: 'Çıkış başarısız' }),
    });

    const handleLogout = async () => {
        mutate.mutate();
    };

    return (
        <nav className="flex items-start flex-1 justify-between">
            <div className="w-2/4 lg:w-1/5">
                <SearchPopup />
            </div>
            <div className="px-3 flex items-center gap-2">
                <ModeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <UserAvatar img={userInfo?.profileImg} name={userInfo?.name ?? 'AN'} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-4 w-36">
                        <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem disabled={!userInfo}>
                            <Link
                                className={`flex-1 flex items-center ${!userInfo ? 'pointer-events-none opacity-50' : ''}`}
                                to='/profile'
                            >
                                <User className="mr-2 h-4 w-4" />
                                <span>Profil</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={!userInfo}>
                            <Link
                                className={`flex-1 flex items-center ${!userInfo ? 'pointer-events-none opacity-50' : ''}`}
                                to='/notifications'
                            >
                                <Bell className="mr-2 h-4 w-4" />
                                <span>Bildirimler</span>
                            </Link>
                        </DropdownMenuItem>
                        {userInfo ? (
                            <DropdownMenuItem
                                className="text-red-500 hover:bg-red-50 cursor-pointer"
                                onClick={handleLogout}
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span className="flex-1">Çıkış Yap</span>
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem
                                className="text-green-500 hover:bg-green-50 cursor-pointer"
                                onClick={() => nav('/login')}
                            >
                                <LogIn className="mr-2 h-4 w-4" />
                                <span className="flex-1">Giriş Yap</span>
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
};

export default Navbar;
