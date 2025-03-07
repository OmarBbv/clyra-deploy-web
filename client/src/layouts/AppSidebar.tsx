import { useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Coffee,
  GraduationCap,
  Home,
  MessageCircleQuestion,
  Settings,
} from 'lucide-react';
import coffee from '../assets/Buy-Me-a-Coffee.webp';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserProvider';
import LoginRequiredPopup from '@/components/LoginRequiredPopup';
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { motion } from 'framer-motion';

interface NavbarItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

const navbarItems: NavbarItem[] = [
  {
    title: 'Ana Sayfa',
    url: '/',
    icon: Home,
  },
  {
    title: 'Hikayeler',
    url: '/stories',
    icon: BookOpen,
  },
  {
    title: 'Dersler',
    url: '/lessons',
    icon: GraduationCap,
  },
  {
    title: 'Soru Cevap',
    url: '/under-construction',
    icon: MessageCircleQuestion,
  },
  {
    title: 'Ayarlar',
    url: '/settings',
    icon: Settings,
  },
];

const text =
  'Bu projeyi desteklemek için bir kahve ısmarlayabilirsiniz! Her destek, daha iyi içerikler üretmeme katkı sağlıyor. Teşekkürler!';

export default function AppSidebar() {
  const nav = useNavigate();
  const location = useLocation();
  const { userInfo } = useUser();
  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const isMobile = useIsMobile();
  // Use a ref to track if animation has played
  const animationPlayedRef = React.useRef(false);

  // Animation variants for the logo container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
        when: 'beforeChildren',
      },
    },
  };

  // Animation variants for each letter
  const letterVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const isLinkActive = (url: string) => {
    if (url === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(url);
  };

  const handleNavigate = (url: string) => {
    if (!userInfo && url === '/settings') {
      setLoginPopupOpen(true);
    } else {
      nav(url);
    }
    if (isMobile === true) {
      // Mobile navigation logic can go here
    }
  };

  return (
    <Sidebar className="w-64 bg-background text-foreground">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-24 w-full flex items-center justify-center my-2 px-0">
            <motion.div
              className="flex items-center justify-center h-full w-full bg-transparent rounded-lg"
              variants={containerVariants}
              initial={animationPlayedRef.current ? 'visible' : 'hidden'}
              animate="visible"
              onAnimationComplete={() => {
                animationPlayedRef.current = true;
              }}
            >
              {Array.from('clyra.io').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="text-4xl font-bold text-primary"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navbarItems.map((item) => {
                const isDisabled = item.title === 'Ayarlar' && !userInfo;
                const isActive = isLinkActive(item.url);
                return (
                  <SidebarMenuItem key={item.title} className="mt-0.5">
                    <SidebarMenuButton
                      variant="default"
                      onClick={() => handleNavigate(item.url)}
                      className={`flex items-center space-x-1 p-4 rounded-md transition-colors
                         ${
                           isDisabled
                             ? 'text-muted-foreground opacity-50 hover:bg-transparent'
                             : isActive
                             ? 'bg-accent hover:text-accent-foreground'
                             : 'hover:bg-accent hover:text-accent-foreground'
                         }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
            <VerticalCard />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <LoginRequiredPopup
        isOpen={isLoginPopupOpen}
        setIsOpen={setLoginPopupOpen}
      />
    </Sidebar>
  );
}

const VerticalCard = () => {
  return (
    <div className="flex justify-center">
      <Card className="w-auto h-auto shadow-lg rounded-lg mt-3 bg-card text-card-foreground">
        <CardHeader className="flex flex-col items-center px-4">
          <img
            src={coffee || '/placeholder.svg'}
            alt="Card Image"
            className="w-full h-[7.7rem] bg-center object-cover object-right rounded-lg"
            draggable="false"
            loading="lazy"
          />
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <span>Buy Me Coffee</span>
            <Coffee />
          </CardTitle>
        </CardHeader>
        <CardContent className="py-0">
          <TextGenerateEffect
            className="my-0 mt-0 text-muted-foreground text-center text-sm"
            words={text}
          />
        </CardContent>
        <CardFooter className="flex justify-center p-4">
          <Button variant="secondary" size="default" className="px-5">
            Destek Ol
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
