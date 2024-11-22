import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import BASE_API from '@/utils/apiConfig'
import { useNavigate } from 'react-router-dom'
import { setCookie } from 'typescript-cookie'

const loginSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır." }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function AdminLogin() {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const mutate = useMutation({
    mutationKey: ['post/login admin'],
    mutationFn: async (params: LoginFormValues) => {
      const res = await BASE_API.post('/users/login', params);
      if (res.data.role === 'admin') {
        setCookie('token', res.data.token, {
          expires: 7,
          secure: true,
          httpOnly: false,
          sameSite: 'Strict',
      });
        nav('/dashboard');
        return res.data
      }

    }
  })

  function handleLoginAdmin(params: LoginFormValues) {
    mutate.mutate(params);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Admin Girişi</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLoginAdmin)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-posta</FormLabel>
                    <FormControl>
                      <Input placeholder="ornek@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şifre</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Giriş Yap
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}