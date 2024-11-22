import React from 'react'
import { motion } from 'framer-motion'
import { Code, ArrowLeft, Book, Users, Lightbulb, CheckCircle, Palette, Rocket, Briefcase } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from 'react-router-dom'


export default function HtmlStaticPage() {

    return (
        <div className={`min-h-screen md:p-8 relative overflow-hidden transition-colors duration-300`}>
            <div className="flex justify-between items-center mb-8">
                <Link to="/">
                    <Button variant="ghost" size="lg">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Ana Sayfaya Dön
                    </Button>
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                <Card>
                    <CardHeader>
                        <div className="flex items-center space-x-4">
                            <Code className="h-12 w-12 text-blue-500 dark:text-blue-400" />
                            <div>
                                <CardTitle className="text-3xl">HTML & CSS Eğitimi</CardTitle>
                                <CardDescription className="text-xl">
                                    MERN stack yolculuğunuzun sağlam temelleri
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg mb-6">
                            Bu kapsamlı eğitimde, modern web geliştirmenin yapı taşlarını öğrenecek ve uygulamalı projelerle deneyim kazanacaksınız.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <FeatureCard
                                icon={Book}
                                title="Kapsamlı Müfredat"
                                description="HTML5 ve CSS3'ün en son özelliklerini kapsayan detaylı bir eğitim programı."
                            />
                            <FeatureCard
                                icon={Users}
                                title="Proje Bazlı Öğrenme"
                                description="Gerçek dünya projelerinde uygulama yaparak pratik deneyim kazanın."
                            />
                            <FeatureCard
                                icon={Lightbulb}
                                title="Modern Teknikler"
                                description="Flexbox, Grid ve responsive tasarım gibi güncel teknikleri öğrenin."
                            />
                            <FeatureCard
                                icon={CheckCircle}
                                title="Sertifika"
                                description="Eğitimi tamamladığınızda uluslararası geçerliliği olan bir sertifika alın."
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Kurs İçeriği</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="html" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="html">HTML</TabsTrigger>
                                <TabsTrigger value="css">CSS</TabsTrigger>
                            </TabsList>
                            <TabsContent value="html">
                                <ul className="list-disc list-inside space-y-2">
                                    <li>HTML5 yapısı ve semantik etiketler</li>
                                    <li>Form elemanları ve doğrulama</li>
                                    <li>Multimedya entegrasyonu</li>
                                    <li>SEO dostu HTML yapıları</li>
                                </ul>
                            </TabsContent>
                            <TabsContent value="css">
                                <ul className="list-disc list-inside space-y-2">
                                    <li>CSS3 seçicileri ve özellikleri</li>
                                    <li>Flexbox ve Grid sistemleri</li>
                                    <li>Responsive web tasarımı</li>
                                    <li>CSS animasyonları ve geçişler</li>
                                </ul>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Neden HTML & CSS Öğrenmeliyim?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg mb-4">
                            HTML ve CSS, web geliştirmenin temel taşlarıdır. Bu teknolojileri öğrenmek, size şunları kazandıracak:
                        </p>
                        <ul className="space-y-4 mb-4">
                            <li className="flex items-start">
                                <Code className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" />
                                <span>Her türlü web projesinde sağlam bir temel</span>
                            </li>
                            <li className="flex items-start">
                                <Palette className="h-6 w-6 text-pink-500 mr-2 flex-shrink-0" />
                                <span>Tasarım fikirlerinizi hayata geçirme yeteneği</span>
                            </li>
                            <li className="flex items-start">
                                <Rocket className="h-6 w-6 text-orange-500 mr-2 flex-shrink-0" />
                                <span>Daha karmaşık web teknolojilerini öğrenmek için hazırlık</span>
                            </li>
                            <li className="flex items-start">
                                <Briefcase className="h-6 w-6 text-purple-500 mr-2 flex-shrink-0" />
                                <span>Freelance iş fırsatları ve kariyer olanakları</span>
                            </li>
                        </ul>
                        <p className="text-lg">
                            MERN stack'in frontend kısmında uzmanlaşmak için HTML ve CSS'de güçlü bir temel oluşturmak çok önemlidir.
                            Bu kurs, ileride öğreneceğiniz JavaScript ve React konularına hazırlık niteliğindedir.
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

interface FeatureCardProps {
    icon: React.ElementType,
    title: string,
    description: string
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    return (
        <Card>
            <CardContent className="p-6 flex items-start">
                <Icon className="h-8 w-8 text-blue-500 dark:text-blue-400 mr-4 mt-1 flex-shrink-0" />
                <div>
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}