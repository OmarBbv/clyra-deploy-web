import React  from 'react'
import { motion } from 'framer-motion'
import { Layout, ArrowLeft, Book, Users, Zap, CheckCircle, Code, Globe, Briefcase } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from 'react-router-dom'

export default function ReactStaticPage() {

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
                            <Layout className="h-12 w-12 text-cyan-500 dark:text-cyan-400" />
                            <div>
                                <CardTitle className="text-3xl">React Eğitimi</CardTitle>
                                <CardDescription className="text-xl">
                                    MERN stack'in güçlü frontend kütüphanesi
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg mb-6">
                            Bu kapsamlı eğitimde, modern web uygulamalarının vazgeçilmezi olan React kütüphanesini derinlemesine öğrenecek ve etkileyici kullanıcı arayüzleri geliştireceksiniz.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <FeatureCard
                                icon={Book}
                                title="Kapsamlı Müfredat"
                                description="React'in temellerinden ileri seviye konulara kadar detaylı bir eğitim programı."
                            />
                            <FeatureCard
                                icon={Users}
                                title="Proje Bazlı Öğrenme"
                                description="Gerçek dünya projelerinde uygulama yaparak pratik deneyim kazanın."
                            />
                            <FeatureCard
                                icon={Zap}
                                title="Modern React"
                                description="Hooks, Context API, ve Redux gibi güncel React özelliklerini ve ekosistemini öğrenin."
                            />
                            <FeatureCard
                                icon={CheckCircle}
                                title="Sertifikasyon"
                                description="Eğitimi tamamladığınızda React uzmanlığınızı belgeleyen bir sertifika alın."
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Kurs İçeriği</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="basics" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="basics">Temel Konular</TabsTrigger>
                                <TabsTrigger value="advanced">İleri Seviye</TabsTrigger>
                            </TabsList>
                            <TabsContent value="basics">
                                <ul className="list-disc list-inside space-y-2">
                                    <li>JSX ve React elementleri</li>
                                    <li>Komponentler ve props</li>
                                    <li>State ve lifecycle</li>
                                    <li>Event handling ve form yönetimi</li>
                                </ul>
                            </TabsContent>
                            <TabsContent value="advanced">
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Hooks (useState, useEffect, useContext, vb.)</li>
                                    <li>Context API ve global state yönetimi</li>
                                    <li>React Router ile sayfa yönlendirme</li>
                                    <li>Redux ve Redux Toolkit ile state yönetimi</li>
                                </ul>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Neden React Öğrenmeliyim?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg mb-4">
                            React, modern web geliştirmenin en popüler frontend kütüphanelerinden biridir. İşte React öğrenmenin size sağlayacağı avantajlar:
                        </p>
                        <ul className="space-y-4 mb-4">
                            <li className="flex items-start">
                                <Zap className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" />
                                <span>Hızlı ve etkileşimli kullanıcı arayüzleri oluşturma</span>
                            </li>
                            <li className="flex items-start">
                                <Code className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" />
                                <span>Komponent tabanlı geliştirme ile kod tekrarını azaltma</span>
                            </li>
                            <li className="flex items-start">
                                <Globe className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                                <span>Geniş bir ekosistem ve topluluk desteği</span>
                            </li>
                            <li className="flex items-start">
                                <Briefcase className="h-6 w-6 text-purple-500 mr-2 flex-shrink-0" />
                                <span>Yüksek maaşlı iş fırsatları ve kariyer olanakları</span>
                            </li>
                        </ul>
                        <p className="text-lg">
                            MERN stack'in frontend kısmında uzmanlaşmak için React'te güçlü bir temel oluşturmak çok önemlidir.
                            Bu kurs, modern web uygulamaları geliştirmeniz için gerekli tüm React becerilerini size kazandıracaktır.
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
                <Icon className="h-8 w-8 text-yellow-500 dark:text-yellow-400 mr-4 mt-1 flex-shrink-0" />
                <div>
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}
