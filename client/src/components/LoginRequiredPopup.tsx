import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { LogIn } from 'lucide-react'
import { useNavigate } from "react-router-dom"

interface LoginRequiredPopupProps {
    isOpen: boolean
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LoginRequiredPopup({ isOpen, setIsOpen }: LoginRequiredPopupProps) {
    const nav = useNavigate();

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="min-w-[300px] sm:max-w-[400px] w-[92%] rounded-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <LogIn className="h-6 w-6 text-blue-500" />
                        Giriş Yapmanız Gerekli
                    </DialogTitle>
                    <DialogDescription>
                        Bu içeriği görüntülemek için lütfen giriş yapın veya bir hesap oluşturun.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center py-4">
                    <LogIn className="h-24 w-24 text-blue-500" />
                </div>
                <DialogFooter className="sm:justify-start">
                    <Button type="button" onClick={() => nav('/login')}>
                        Giriş Yap
                    </Button>
                    <Button variant="outline" type="button" onClick={() => nav('/register')}>
                        Hesap Oluştur
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
