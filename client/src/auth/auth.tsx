import { useToast } from '@/hooks/use-toast';
import BASE_API from '@/utils/apiConfig';
import { useNavigate } from 'react-router-dom';
import { removeCookie, setCookie } from 'typescript-cookie';

export default function useAuth() {
    const { toast } = useToast();
    const nav = useNavigate();

    const login = async (email: string, password: string) => {
        try {
            const res = await BASE_API.post('/users/login', { email, password });
            if (res.data.token) {
                setCookie('token', res.data.token, {
                    expires: 7,
                    secure: true,
                    httpOnly: false,
                    sameSite: 'Strict',
                });
                nav('/');
            } else {
                toast({ title: 'Giriş başarısız', description: 'Kullanıcı adı veya şifre hatalı' });
            }
        } catch (error) {
            toast({ title: 'Giriş başarısız', description: 'Bir hata oluştu' });
            throw error;
        }
    }

    const logout = async () => {
        try {
            toast({ title: 'Çıkış yapılıyor...', description: 'Lütfen bekleyin.' });
            await BASE_API.post('/users/logout', null, { withCredentials: true });
            removeCookie('token');
            toast({ title: 'Çıkış başarılı', description: 'Başarıyla çıkış yapıldı' });
            nav('/login');
        } catch (error) {
            toast({ title: 'Çıkış başarısız', description: 'Bir hata oluştu' });
        }
    };
    


    return { login, logout }
}