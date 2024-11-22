import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Atom, Server, Database, FileJson, Code, BookOpen, Users, Zap } from 'lucide-react'
import HeroBanner from "@/components/HeroBanner"
import PageMeta from '@/components/PageMeta'
import Footer from '@/layouts/Footer'

const FeatureCard = ({ icon, title, description }: { icon: any, title: string, description: string }) => (
  <Card className="h-full hover:shadow-lg transition-shadow">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
)

const TestimonialCard = ({ name, role, content }: { name: string, role: string, content: string }) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle>{name}</CardTitle>
      <CardDescription>{role}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm italic">"{content}"</p>
    </CardContent>
  </Card>
)

const CourseOverview = () => (
  <Tabs defaultValue="javascript" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
        <TabsTrigger value="react">React</TabsTrigger>
        <TabsTrigger value="node">Node.js</TabsTrigger>
        <TabsTrigger value="express">Express</TabsTrigger>
      </TabsList>
      <TabsContent value="javascript">
        <Card>
          <CardHeader>
            <CardTitle>JavaScript Dersleri</CardTitle>
            <CardDescription>Modern web programlamanın temeli</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Temel veri tipleri ve operatörler</li>
              <li>Fonksiyonlar ve scope kavramı</li>
              <li>DOM manipülasyonu ve event handling</li>
              <li>Asenkron JavaScript (Promises, Async/Await)</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="react">
        <Card>
          <CardHeader>
            <CardTitle>React Dersleri</CardTitle>
            <CardDescription>Modern UI geliştirmenin temelleri</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>JSX ve Component yapısı</li>
              <li>State ve Props yönetimi</li>
              <li>Hooks ve Custom Hooks</li>
              <li>React Router ile SPA geliştirme</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="node">
        <Card>
          <CardHeader>
            <CardTitle>Node.js Dersleri</CardTitle>
            <CardDescription>Sunucu tarafı JavaScript programlama</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Asenkron programlama</li>
              <li>Dosya sistemi işlemleri</li>
              <li>HTTP sunucu oluşturma</li>
              <li>NPM ve paket yönetimi</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="express">
        <Card>
          <CardHeader>
            <CardTitle>Express Dersleri</CardTitle>
            <CardDescription>Hızlı ve minimalist web framework</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Routing ve Middleware</li>
              <li>RESTful API geliştirme</li>
              <li>Şablon motorları kullanımı</li>
              <li>Hata yönetimi ve güvenlik</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
)


const Home = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 overflow-hidden relative">
      <PageMeta title="Ana Sayfa" />

      <HeroBanner />
      
      <motion.div
        className="container mx-auto mt-12 flex justify-center gap-8 text-4xl text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}><Atom /></motion.div>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}><Server /></motion.div>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}><FileJson /></motion.div>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}><Database /></motion.div>
      </motion.div>

      <section className="container mx-auto mt-20 px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          {...fadeInUp}
        >
          Öne Çıkan Dersler
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {['React Temelleri', 'Node.js ile API Geliştirme', 'MongoDB ve Veri Modelleme'].map((title, index) => (
            <motion.div key={title} {...fadeInUp} transition={{ delay: index * 0.2 }}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {index === 0 ? <Atom className="text-blue-500" /> :
                      index === 1 ? <Server className="text-green-500" /> :
                        <Database className="text-yellow-500" />}
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    MERN stack'in temel taşlarını öğrenin ve web geliştirme becerilerinizi bir üst seviyeye taşıyın.
                  </CardDescription>
                  <div className="mt-4">
                    <Badge variant="secondary">Yeni Başlayanlar İçin</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto mt-20 px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          {...fadeInUp}
        >
          Kurs İçeriği
        </motion.h2>
        <motion.div {...fadeInUp}>
          <CourseOverview />
        </motion.div>
      </section>

      <section className="container mx-auto mt-20 px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          {...fadeInUp}
        >
          Neden MERN Stack?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Code className="text-blue-500" />}
            title="Full-Stack Geliştirme"
            description="Hem ön yüz hem de arka yüz geliştirme becerilerini tek bir stack'te öğrenin."
          />
          <FeatureCard
            icon={<Zap className="text-yellow-500" />}
            title="Yüksek Performans"
            description="Node.js ve React'in gücüyle hızlı ve verimli uygulamalar geliştirin."
          />
          <FeatureCard
            icon={<Users className="text-green-500" />}
            title="Geniş Topluluk"
            description="Büyük ve aktif bir geliştirici topluluğundan destek alın."
          />
          <FeatureCard
            icon={<BookOpen className="text-purple-500" />}
            title="Kapsamlı Öğrenme"
            description="Modern web geliştirmenin tüm yönlerini derinlemesine keşfedin."
          />
        </div>
      </section>

      <section className="container mx-auto mt-20 px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          {...fadeInUp}
        >
          Öğrenci Yorumları
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TestimonialCard
            name="Ayşe Yılmaz"
            role="Junior Web Developer"
            content="Bu kurs sayesinde MERN stack'i derinlemesine öğrendim ve ilk full-stack projemi geliştirdim. Harika bir deneyimdi!"
          />
          <TestimonialCard
            name="Mehmet Kaya"
            role="Freelance Yazılımcı"
            content="MERN stack bilgim sayesinde daha fazla proje alabiliyorum. Bu kurs kariyerimde büyük bir sıçrama yapmamı sağladı."
          />
          <TestimonialCard
            name="Zeynep Demir"
            role="Startup Kurucu"
            content="Kendi startup'ımın MVP'sini MERN stack kullanarak geliştirdim. Bu kurs olmasaydı bu kadar hızlı ilerleyemezdim."
          />
        </div>
      </section>

      <motion.section
        className="container mx-auto my-20 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-6 px-4">MERN Stack'i Keşfedin</h2>
        <p className="text-xl mb-8 px-4 sm:px-6 lg:px-8">Modern web geliştirmenin gücünü bugün keşfedin ve kariyerinizi bir adım öne taşıyın!</p>
        <Button size="lg" className="text-lg px-8 py-6">
          Hemen Başlayın
        </Button>
      </motion.section>

      <Footer />
    </div>
  )
}

export default Home