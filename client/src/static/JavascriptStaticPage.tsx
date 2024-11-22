import React  from 'react'
import { motion } from 'framer-motion'
import { Palette, ArrowLeft, Book, Users, Zap, CheckCircle, Code, Globe, Briefcase } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from 'react-router-dom'

export default function JavaScriptStaticPage() {

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
                            <Palette className="h-12 w-12 text-yellow-500 dark:text-yellow-400" />
                            <div>
                                <CardTitle className="text-3xl">JavaScript Eğitimi</CardTitle>
                                <CardDescription className="text-xl">
                                    MERN stack'in temel programlama dili
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg mb-6">
                            Bu kapsamlı eğitimde, modern web geliştirmenin vazgeçilmez dili JavaScript'i derinlemesine öğrenecek ve güçlü web uygulamaları geliştireceksiniz.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <FeatureCard
                                icon={Book}
                                title="Kapsamlı Müfredat"
                                description="JavaScript'in temellerinden ileri seviye konulara kadar detaylı bir eğitim programı."
                            />
                            <FeatureCard
                                icon={Users}
                                title="Proje Bazlı Öğrenme"
                                description="Gerçek dünya projelerinde uygulama yaparak pratik deneyim kazanın."
                            />
                            <FeatureCard
                                icon={Zap}
                                title="Modern JavaScript"
                                description="ES6+ özellikleri, async/await, ve modüler yapılar gibi güncel konuları öğrenin."
                            />
                            <FeatureCard
                                icon={CheckCircle}
                                title="Sertifikasyon"
                                description="Eğitimi tamamladığınızda JavaScript uzmanlığınızı belgeleyen bir sertifika alın."
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
                                    <li>Değişkenler, veri tipleri ve operatörler</li>
                                    <li>Kontrol yapıları ve döngüler</li>
                                    <li>Fonksiyonlar ve scope</li>
                                    <li>Arrays ve Objects</li>
                                </ul>
                            </TabsContent>
                            <TabsContent value="advanced">
                                <ul className="list-disc list-inside space-y-2">
                                    <li>ES6+ özellikleri (let/const, arrow functions, destructuring)</li>
                                    <li>Asenkron programlama (Promises, async/await)</li>
                                    <li>Modüler JavaScript ve module bundlers</li>
                                    <li>DOM manipülasyonu ve event handling</li>
                                </ul>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Neden JavaScript Öğrenmeliyim?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg mb-4">
                            JavaScript, modern web geliştirmenin temel taşıdır. İşte JavaScript öğrenmenin size sağlayacağı avantajlar:
                        </p>
                        <ul className="space-y-4 mb-4">
                            <li className="flex items-start">
                                <Code className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" />
                                <span>Hem frontend hem de backend geliştirme yapabilme yeteneği</span>
                            </li>
                            <li className="flex items-start">
                                <Zap className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" />
                                <span>Dinamik ve interaktif web uygulamaları oluşturma</span>
                            </li>
                            <li className="flex items-start">
                                <Globe className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                                <span>Geniş bir ekosistem ve kütüphane çeşitliliği</span>
                            </li>
                            <li className="flex items-start">
                                <Briefcase className="h-6 w-6 text-purple-500 mr-2 flex-shrink-0" />
                                <span>Yüksek maaşlı iş fırsatları ve kariyer olanakları</span>
                            </li>
                        </ul>
                        <p className="text-lg">
                            MERN stack'in temel programlama dili olarak JavaScript'te güçlü bir temel oluşturmak çok önemlidir.
                            Bu kurs, modern web uygulamaları geliştirmeniz için gerekli tüm JavaScript becerilerini size kazandıracaktır.
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

