import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import PageMeta from "@/components/PageMeta"

export default function Settings() {

  return (
    <div className="container mx-auto py-10">
      <PageMeta title='Ayarlar' />
      <Tabs defaultValue="privacy" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-auto">
          <TabsTrigger value="privacy">Gizlilik</TabsTrigger>
          <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
          <TabsTrigger value="appearance">Görünüm</TabsTrigger>
          <TabsTrigger value="security">Güvenlik</TabsTrigger>
          <TabsTrigger value="integrations">Entegrasyonlar</TabsTrigger>
          <TabsTrigger value="language">Dil ve Bölge</TabsTrigger>
          <TabsTrigger value="help">Yardım</TabsTrigger>
        </TabsList>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Gizlilik Ayarları</CardTitle>
              <CardDescription>Hesap gizliliğinizi yönetin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="private-account">Özel Hesap</Label>
                <Switch id="private-account" />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Hesap Silme</Label>
                <p className="text-sm text-muted-foreground">Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinecektir.</p>
                <Button variant="destructive">Hesabı Sil</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Ayarları</CardTitle>
              <CardDescription>Bildirim tercihlerinizi yönetin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">E-posta Bildirimleri</Label>
                <Switch id="email-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Bildirimleri</Label>
                <Switch id="push-notifications" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Görünüm Ayarları</CardTitle>
              <CardDescription>Tema ve görünüm tercihlerinizi özelleştirin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="theme">Tema</Label>
                <Select>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Tema seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Açık Mod</SelectItem>
                    <SelectItem value="dark">Koyu Mod</SelectItem>
                    <SelectItem value="system">Sistem Ayarı</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="font">Yazı Tipi</Label>
                <Select>
                  <SelectTrigger id="font">
                    <SelectValue placeholder="Yazı tipi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sans">Sans-serif</SelectItem>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="mono">Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Güvenlik Ayarları</CardTitle>
              <CardDescription>Hesap güvenliğinizi artırın.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="2fa">İki Faktörlü Kimlik Doğrulama (2FA)</Label>
                <Switch id="2fa" />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Aktivite Logları</Label>
                <p className="text-sm text-muted-foreground">Son 30 günlük hesap aktiviteleriniz.</p>
                <Button variant="outline">Aktivite Loglarını Görüntüle</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Entegrasyon Ayarları</CardTitle>
              <CardDescription>Sosyal medya ve üçüncü taraf uygulamalarını yönetin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Sosyal Medya Bağlantıları</Label>
                <Button variant="outline">Facebook'a Bağlan</Button>
                <Button variant="outline">Twitter'a Bağlan</Button>
                <Button variant="outline">Instagram'a Bağlan</Button>
              </div>
              <Separator />
              <div className="grid gap-2">
                <Label>API Anahtarı</Label>
                <Input placeholder="API anahtarınız" />
                <Button>Yeni API Anahtarı Oluştur</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>Dil ve Bölge Ayarları</CardTitle>
              <CardDescription>Tercih ettiğiniz dil ve bölge ayarlarını seçin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="language">Dil</Label>
                <Select>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Dil seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tr">Türkçe</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timezone">Zaman Dilimi</Label>
                <Select>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Zaman dilimi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe-istanbul">Europe/Istanbul</SelectItem>
                    <SelectItem value="europe-london">Europe/London</SelectItem>
                    <SelectItem value="america-new_york">America/New_York</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle>Yardım ve Destek</CardTitle>
              <CardDescription>Sıkça sorulan sorular ve destek seçenekleri.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Sıkça Sorulan Sorular</Label>
                <Button variant="outline">SSS'leri Görüntüle</Button>
              </div>
              <Separator />
              <div className="grid gap-2">
                <Label>Destek Talebi</Label>
                <Textarea placeholder="Sorununuz hakkında daha fazla bilgi verin." />
                <Button>Bize Ulaşın</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
