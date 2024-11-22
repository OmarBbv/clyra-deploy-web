import React from 'react'
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useUser } from '@/contexts/UserProvider'
import { useMutation } from '@tanstack/react-query'
import BASE_API from '@/utils/apiConfig'
import { toast } from "@/hooks/use-toast";
import { Toaster } from '@/components/ui/toaster'
import LoadingErrorStates from '@/components/LoadingErrorStates'
import PageMeta from '@/components/PageMeta'
import { useNavigate } from 'react-router-dom'

const profileSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  surname: z.string().min(2, "Soyisim en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  mobile: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  location: z.string().optional(),
  interests: z.string().optional(),
  occupation: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function Profile() {
  const { userInfo, isLoading, isError, setChanged } = useUser()
  const [profileImage, setProfileImage] = React.useState("/placeholder.svg?height=100&width=100")
  const [profileCompletion, setProfileCompletion] = React.useState(0)
  const [existingImage, setExistingImage] = React.useState(userInfo?.profileImg);
  const nav = useNavigate()

  const { control, handleSubmit, watch, setValue } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userInfo?.name || "",
      surname: userInfo?.surname || "",
      email: userInfo?.email || "",
      mobile: userInfo?.mobile || "",
      location: userInfo?.location || "",
      interests: userInfo?.interests || "",
      occupation: userInfo?.occupation || "",
    },
  })

  const watchAllFields = watch()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const mutate = useMutation({
    mutationKey: ['post/update-account'],
    mutationFn: async (data: ProfileFormValues) => {
      const newData = { ...data, profileImg: profileImage };
      try {
        const res = await BASE_API.put('/users/update-profile', newData);
        console.log(res.data);
      } catch (error: any) {
        console.log(error);
      }
    },
    onSuccess: () => {
      if (existingImage !== profileImage) {
        window.location.reload();
      } else {
        toast({
          title: 'Profil Güncellenmedi!',
          description: 'Profil resminiz değişmedi. Lütfen yeni bir profil resmi yükleyin.',
        });
        toast({
          title: 'Profil Güncellendi!',
          description: 'Bilgileriniz başarıyla güncellendi. Yeni bilgilerinizle profilinizi daha iyi yansıtın!',
        });
      }
      if (setChanged) setChanged(true)
    },
  });

  const hadlePostForm = (data: ProfileFormValues) => {
    console.log(data)
    mutate.mutate(data);
  }

  React.useEffect(() => {
    if (userInfo) {
      setValue("name", userInfo.name || "")
      setValue("surname", userInfo.surname || "")
      setValue("email", userInfo.email || "")
      setValue("mobile", userInfo.mobile || "")
      setValue("location", userInfo.location || "")
      setValue("interests", userInfo.interests || "")
      setValue("occupation", userInfo.occupation || "")
      setProfileImage(userInfo.profileImg || "/placeholder.svg?height=100&width=100")
    }
  }, [userInfo, setValue])

  React.useEffect(() => {
    const totalFields = Object.keys(watchAllFields).length
    const filledFields = Object.values(watchAllFields).filter(Boolean).length
    setProfileCompletion((filledFields / totalFields) * 100)
  }, [watchAllFields])

  React.useEffect(() => {
    if (userInfo) {
      setExistingImage(userInfo.profileImg || "/placeholder.svg?height=100&width=100");
    }
  }, [userInfo]);

  if (isLoading || isError) return <LoadingErrorStates isLoading={isLoading} isError={isError} />

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <PageMeta title='Profil' />

      <Toaster />
      {userInfo !== null || undefined ? <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Profil Bilgileri</CardTitle>
          <Progress value={profileCompletion} className="w-full h-2 mt-4" />
          <p className="text-sm text-muted-foreground text-center mt-2">Profil Tamamlanma: {Math.floor(profileCompletion)}%</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(hadlePostForm)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={profileImage} alt="Profile" className='object-contain' draggable={false} />
                  <AvatarFallback>{userInfo?.name?.[0]}{userInfo?.surname?.[0]}</AvatarFallback>
                </Avatar>
                <Label htmlFor="profile-image" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
                  Profil Resmi Yükle
                </Label>
                <Input id="profile-image" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">İsim</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => <Input {...field} id="name" placeholder="İsminiz" />}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Soyisim</Label>
                <Controller
                  name="surname"
                  control={control}
                  render={({ field }) => <Input {...field} id="surname" placeholder="Soyisminiz" />}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Input
                    {...field}
                    disabled={true}
                    id="email"
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="bg-gray-200 text-gray-900 cursor-not-allowed"
                  />}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Konum</Label>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => <Input {...field} id="location" placeholder="Yaşadığınız şehir" />}
                />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <div className="relative">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="••••••••"
                      />
                    )}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Güçlü bir şifre en az 8 karakter uzunluğunda olmalı ve büyük/küçük harf, rakam ve özel karakter içermelidir.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Progress value={calculatePasswordStrength(watch("password") || "")} className="w-full h-2" />
                <p className="text-sm text-muted-foreground">Şifre gücü: {calculatePasswordStrength(watch("password") || "")}%</p>
              </div> */}
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="occupation">Meslek</Label>
                <Controller
                  name="occupation"
                  control={control}
                  render={({ field }) => <Input {...field} id="occupation" placeholder="Mesleğiniz" />}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobil Numara</Label>
                <Controller
                  name="mobile"
                  control={control}
                  render={({ field }) => <Input {...field} id="mobile" type="tel" placeholder="Mobil numaranız" />}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">İlgi Alanları</Label>
                <Controller
                  name="interests"
                  control={control}
                  render={({ field }) => <Textarea {...field} id="interests" placeholder="İlgi alanlarınızı virgülle ayırarak yazın"
                    className='md:min-h-[320px]'
                  />}
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="w-full mt-6">Profili Güncelle</Button>
            </div>
          </form>
        </CardContent>
      </Card>
        :
        <Card className="max-w-md mx-auto mt-20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Giriş Yapmanız Gerekiyor</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Profil bilgilerinizi görüntülemek ve düzenlemek için lütfen giriş yapın.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={() => nav('/login')}>
                Giriş Yap
              </Button>
              <Button onClick={() => nav('/register')}>
                Kayıt Ol
              </Button>
            </div>
          </CardContent>
        </Card>
      }
    </div>
  )
}