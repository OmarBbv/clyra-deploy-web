import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from 'react-router-dom'
import PageMeta from '@/components/PageMeta'

function UnderConstruction() {
  const dotsRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (dotsRef.current) {
      dotsRef.current.classList.add('animate-dots')
    }
  }, [])

  return (
    <div className="min-h-[600px] flex items-center justify-center p-4">
      <PageMeta title='Yapım Aşamasında' />
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center space-y-6 p-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Loader2 className="w-24 h-24 text-primary animate-spin" />
          </motion.div>

          <motion.h1
            className="text-3xl font-bold text-center text-primary"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Yapım Aşamasında
          </motion.h1>

          <motion.p
            className="text-lg text-center text-muted-foreground"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Bu bölüm henüz yapım aşamasında, en kısa sürede tamamlanacak!
          </motion.p>

          <motion.div
            className="text-xl font-semibold text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Yükleniyor<span ref={dotsRef}></span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/">
              <Button variant="secondary">
                Ana Sayfaya Dön
              </Button>
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}

export default React.memo(UnderConstruction)