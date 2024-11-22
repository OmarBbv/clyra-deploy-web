import React from "react"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query"
import BASE_API from "@/utils/apiConfig"
import { toast } from "@/hooks/use-toast"
import auth from "@/auth/auth"
import { Toaster } from "@/components/ui/toaster"
import PageMeta from "@/components/PageMeta"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

interface IFormValidation {
    email: string,
    password: string
}

const loginSchema = z.object({
    email: z.string().email({ message: "Geçerli bir e-posta adresi girin." }),
    password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır." })
})

export default function Login() {
    const { login } = auth()
    const [showPassword, setShowPassword] = React.useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm<IFormValidation>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const mutate = useMutation({
        mutationKey: ['post/login'],
        mutationFn: async (params: IFormValidation) => {
            const res = await BASE_API.post('/users/login', params);
            return res.data;
        },
        onSuccess: async (data, variables) => {
            toast({ title: 'Giriş Yapılıyor', description: 'Lütfen bekleyin...' });
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const password = variables?.password;
            if (password) {
                login(data.email, password);
            } else {
                toast({ title: 'Giriş işlemi için şifre gerekli' });
            }

        },
        onError: () => {
            toast({ title: "Giriş işlemi sırasında bir hata oluştu", description: "Kullanıcı adı veya şifre hatalı !" });
        }

    });

    const togglePasswordVisibility = () => setShowPassword(!showPassword)

    const handleLoginForm = async (params: IFormValidation) => {
        mutate.mutate(params);
    }

    return (
        <div className="flex min-h-screen flex-col lg:flex-row">
            <PageMeta title="Giriş Yap" />
            <Toaster />
            <div className="flex flex-1 items-center justify-center p-8 lg:p-16 border border-r">
                <div className="max-w-md text-center">
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
                        Hoş Geldiniz
                    </h1>
                    <p className="mb-6 text-lg">
                        Uygulamamıza giriş yaparak tüm özelliklerimizden faydalanabilirsiniz. Henüz bir hesabınız yoksa, hemen ücretsiz kayıt olun ve yolculuğunuza başlayın.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Button variant="secondary">
                            <Link
                                to='/'
                            >
                                Ana Sayfaya Dön
                            </Link>
                        </Button>
                        <Button variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                            <Link
                                to="/register"
                            >
                                Kayıt Ol
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 items-center justify-center bg-background py-8 px-1 lg:p-16">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">Giriş Yap</CardTitle>
                        <CardDescription>
                            Hesabınıza erişmek için giriş yapın
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            className="space-y-4"
                        >
                            <div
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="email">E-posta</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2  h-5 w-5 text-muted-foreground" />
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field }) => {
                                                return <Input
                                                    {...field}
                                                    id="email"
                                                    type="email"
                                                    placeholder="ornek@email.com"
                                                    className="pl-10" />
                                            }}
                                        />
                                    </div>
                                    {errors.email && <p className="text-xs text-red-500 font-medium ml-1">{errors.email.message}</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Şifre</Label>
                                    <Link to="/forgot-password" className="ml-auto inline-block text-sm underline">
                                        Şifremi unuttum
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2  h-5 w-5 text-muted-foreground" />
                                    <Controller
                                        name="password"
                                        control={control}
                                        render={({ field }) => {
                                            return <Input
                                                {...field}
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                className="pl-10 pr-10"
                                            />
                                        }}
                                    />

                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 -translate-y-1/2  text-muted-foreground hover:text-foreground"
                                        aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-xs text-red-500 font-medium ml-1">{errors.password.message}</p>}
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button className="w-full"
                            onClick={handleSubmit(handleLoginForm)}
                        >
                            Giriş Yap
                        </Button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Veya şununla devam et
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full">
                                <GitHubLogoIcon className="mr-2 h-4 w-4" />
                                GitHub
                            </Button>
                            <Button variant="outline" className="w-full">
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                    <path d="M1 1h22v22H1z" fill="none" />
                                </svg>
                                Google
                            </Button>
                        </div>
                        <div className="text-center text-sm text-muted-foreground">
                            Hesabınız yok mu?{" "}
                            <Link to="/register" className="font-medium text-primary hover:underline">
                                Hemen Kayıt Olun
                            </Link>
                        </div>
                    </CardFooter>
                    <Separator className="my-4" />
                    <div className="px-6 pb-6 text-center text-xs text-muted-foreground">
                        Giriş yaparak, <a href="#" className="underline hover:text-primary">Kullanım Şartları</a>mızı ve{" "}
                        <Link to="#" className="underline hover:text-primary">Gizlilik Politikası</Link>mızı kabul etmiş olursunuz.
                    </div>
                </Card>
            </div>
        </div>
    )
}