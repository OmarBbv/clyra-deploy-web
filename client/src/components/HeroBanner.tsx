import { motion } from 'framer-motion'
import { ChevronRight, Code, Palette, Layout } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/contexts/UserProvider'
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

import React from 'react'
import { ReactAtomSVG } from '@/assets/svg'

interface ITopic {
  id: string
  title: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
}

const topics: ITopic[] = [
  { id: 'html', title: 'HTML & CSS', icon: Code, color: 'text-blue-500' },
  { id: 'js', title: 'JavaScript', icon: Palette, color: 'text-yellow-500' },
  { id: 'react', title: 'React', icon: Layout, color: 'text-cyan-500' },
]


const text1 = 'Kodlama Serüvenine'
const text2 = 'Hoş Geldiniz'
const text3 = 'Modern web geliştirme dünyasını keşfedin. Pratik örnekler ve kapsamlı derslerle becerilerinizi geliştirin.'

export default function HeroBanner() {
  const [hoveredTopic, setHoveredTopic] = React.useState<string | null>(null)
  const [isStartedWithLogin, setIsStartedWithLogin] = React.useState<boolean>(false);
  const { userInfo } = useUser();
  const nav = useNavigate();



  const handleNavigateStaticPage = (id: string) => {
    if (id === 'html') nav('/html-css')
    if (id === 'js') nav('/js')
    if (id === 'react') nav('/react')
  }

  const handleGroupButton = () => {
    if (!userInfo) {
      nav('/login');
    } else {
      nav('/stories')
    }
  };


  React.useEffect(() => {
    if (!userInfo) setIsStartedWithLogin(true);
    else setIsStartedWithLogin(false)
  }, [userInfo])


  return (
    <div className="relative overflow-hidden bg-background pb-16">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:40px_40px]" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <ReactAtomSVG />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 lg:mt-0 text-center lg:text-left"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
              <motion.span className="block" layout>
                {text1}
              </motion.span>
              <motion.span
                className="block text-gray-300 dark:text-secondary"
                layout
              >
                {text2}
              </motion.span>
            </h1>
            <motion.div
              className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
              layout
            >
              <TextGenerateEffect words={text3} />
            </motion.div>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                onClick={handleGroupButton}
                size="default"
                className="group">
                {isStartedWithLogin ? 'Şimdi Giriş Yap ve Başla' : 'Hemen Öğrenmeye Başla'}
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <h2 className="text-2xl font-bold text-center mb-8">Öne Çıkan Konular</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <motion.div
                key={topic.id}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredTopic(topic.id)}
                onHoverEnd={() => setHoveredTopic(null)}
              >
                <Card
                  onClick={() => handleNavigateStaticPage(topic.id)}
                  className="h-full transition-shadow hover:shadow-lg cursor-pointer"
                >
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                    <topic.icon className={`h-12 w-12 ${topic.color} mb-4`} />
                    <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {hoveredTopic === topic.id
                        ? 'Detaylı bilgi için tıklayın'
                        : 'Modern web geliştirmenin temelleri'}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}


