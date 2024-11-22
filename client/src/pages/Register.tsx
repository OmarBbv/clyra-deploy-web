import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import BASE_API from "@/utils/apiConfig"
import { toast } from "@/hooks/use-toast";
import { Toaster } from '@/components/ui/toaster'
import useAuth from "@/auth/auth"
import PageMeta from "@/components/PageMeta"

interface IFormValidation {
    name: string,
    surname: string,
    email: string,
    mobile: string,
    password: string,
    rePassword: string
}

const registerSchema = z.object({
    name: z.string().min(3, { message: "İsiminizde en az 3 harf olmalı" }),
    surname: z.string().min(3, { message: "İsiminizde en az 3 harf olmalı" }),
    email: z.string().email({ message: "Geçerli bir e-posta adresi girin." }),
    password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır." }),
    rePassword: z.string().min(6, { message: "Tekrar Şifreyle Şifre benzer değil" }),
    mobile: z.string().min(10, { message: "Mobil Numara en az 10 harf olmalı" }),
})

export default function Register() {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { control, handleSubmit, formState: { errors } } = useForm<IFormValidation>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            mobile: '',
            password: '',
            rePassword: ''
        }
    })

    const togglePasswordVisibility = () => setShowPassword(!showPassword)
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)


    const mutate = useMutation({
        mutationKey: ['post/register'],
        mutationFn: async (params: IFormValidation) => {
            const res = await BASE_API.post('/users/register', params);
            return res.data;
        },
        onSuccess: async (data) => {
            toast({ title: 'Giriş Yapılıyor', description: 'Lütfen bekleyin...' });
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const password = mutate.variables?.password;
            if (password) {
                login(data.email, password);
            } else {
                toast({ title: 'Giriş işlemi için şifre gerekli' });
            }
        },
        onError: async () => {
            toast({ title: "Giriş işlemi sırasında bir hata oluştu", description: "Kullanıcı adı veya şifre hatalı !" });
        },
    });
    const handleRegister = (params: IFormValidation) => {
        console.log(params)
        if (params.password === params.rePassword) {
            mutate.mutate(params);
        } else {
            toast({ title: "Geçersiz Şifre", description: "Şifre ve Şifre Tekrarı Yanlış!" });
        }
    }

    return (
        <div className="flex min-h-screen flex-col lg:flex-row">
            <PageMeta title='Kayıt Ol' />
            
            <Toaster />
            <div className="relative flex-1 p-6 lg:p-12 flex flex-col items-center justify-center border border-r">
                <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 text-center">Geleceğe Hoş Geldiniz</h1>
                <p className="text-xl lg:text-2xl mb-8 text-center max-w-lg">
                    Yenilikçi çözümlerimizle dijital dünyanın kapılarını aralayın. Siz hayal edin, biz gerçekleştirelim.
                </p>
                <div className="space-y-4 text-center">
                    <p className="text-lg">✨ Güçlü Araçlar</p>
                    <p className="text-lg">🚀 Hızlı Geliştirme</p>
                    <p className="text-lg">🛡️ Güvenli Altyapı</p>
                </div>
            </div>

            <div className="flex flex-1 items-center justify-center py-8 px-1 lg:p-16">
                <Card className="w-full max-w-md shadow-xl">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-3xl font-bold tracking-tight">Hesap Oluştur</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Yeni bir hesap oluşturmak için bilgilerinizi girin
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-sm font-medium">Ad</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field }) => {
                                            return <Input
                                                {...field}
                                                id="firstName"
                                                placeholder="Adınız"
                                                className="pl-10"
                                            />
                                        }}
                                    />
                                </div>
                                {errors.name && <p className="text-xs text-red-500 font-medium ml-1">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-sm font-medium">Soyad</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Controller
                                        name="surname"
                                        control={control}
                                        render={({ field }) => {
                                            return <Input
                                                {...field}
                                                id="lastName"
                                                placeholder="Soyadınız"
                                                className="pl-10"
                                            />
                                        }}
                                    />
                                </div>
                                {errors.surname && <p className="text-xs text-red-500 font-medium ml-1">{errors.surname.message}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">E-posta</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => {
                                        return <Input
                                            {...field}
                                            id="email"
                                            type="email"
                                            placeholder="ornek@email.com"
                                            className="pl-10"
                                        />
                                    }}
                                />

                            </div>
                            {errors.email && <p className="text-xs text-red-500 font-medium ml-1">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mobile" className="text-sm font-medium">Mobil</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Controller
                                    name="mobile"
                                    control={control}
                                    render={({ field }) => {
                                        return <Input
                                            {...field}
                                            id="mobile"
                                            type="tel"
                                            placeholder="+994 555 55 55"
                                            className="pl-10"
                                        />
                                    }}
                                />
                            </div>
                            {errors.mobile && <p className="text-xs text-red-500 font-medium ml-1">{errors.mobile.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">Şifre</Label>
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
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium">Şifre Tekrarı</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2  h-5 w-5 text-muted-foreground" />
                                <Controller
                                    name="rePassword"
                                    control={control}
                                    render={({ field }) => {
                                        return <Input
                                            {...field}
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            className="pl-10 pr-10"
                                        />
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute right-3 top-1/2 -translate-y-1/2  text-muted-foreground hover:text-foreground"
                                    aria-label={showConfirmPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.rePassword && <p className="text-xs text-red-500 font-medium ml-1">{errors.rePassword.message}</p>}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            onClick={handleSubmit(handleRegister)}
                            className="w-full">Kayıt Ol</Button>
                        <div className="text-center text-sm text-muted-foreground space-x-1">
                            <span>Zaten bir hesabınız var mı?</span>
                            <Link to="/login" className="font-medium text-primary hover:underline">
                                Giriş Yapın
                            </Link>
                        </div>
                    </CardFooter>
                    <Separator className="my-4" />
                    <div className="px-8 pb-8 text-center text-xs text-muted-foreground">
                        Kayıt olarak, <a href="#" className="underline hover:text-primary">Kullanım Şartları</a>mızı ve{" "}
                        <a href="#" className="underline hover:text-primary">Gizlilik Politikası</a>mızı kabul etmiş olursunuz.
                        <p className="mt-2">
                            Bu site reCAPTCHA ile korunmaktadır ve Google{" "}
                            <a href="#" className="underline hover:text-primary">Gizlilik Politikası</a> ve{" "}
                            <a href="#" className="underline hover:text-primary">Hizmet Şartları</a> geçerlidir.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    )
}