import { Github, Mail, Instagram, Linkedin } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';


const SocialLink = ({ url, icon: Icon, label }: { url: string; icon: React.ElementType; label: string }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild className="h-9 w-9">
                    <Link to={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
                        <Icon className="h-4 w-4" />
                    </Link>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{label}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
)

export default function Footer() {
    return (
        <footer className="bg-secondary/30 py-3">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
                        <h3 className="text-lg font-semibold mb-2">MERN Stack Dersleri</h3>
                        <p className="text-sm text-muted-foreground text-center md:text-left">
                            Modern web geliştirme eğitimi için en iyi kaynak
                        </p>
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                        <div className="flex items-center mb-4">
                            <Avatar className="h-10 w-10 mr-4">
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin Avatar" />
                                <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="font-medium">Omar Babaverdiyev</h4>
                                <p className="text-sm text-muted-foreground">MERN Stack Eğitmeni</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <SocialLink url="https://github.com/OmarBbv" icon={Github} label="GitHub" />
                            <SocialLink url="mailto:babaverdiyevbusiness@gmail.com" icon={Mail} label="E-posta" />
                            <SocialLink url="https://instagram.com/admin" icon={Instagram} label="Instagram" />
                            <SocialLink url="https://www.linkedin.com/in/%C3%B6m%C9%99r-babaverdiyev-854b27149/" icon={Linkedin} label="LinkedIn" />
                        </div>
                    </div>
                </div>
                <Separator className="my-8" />
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                        © 2024 MERN Stack Dersleri. Tüm hakları saklıdır.
                    </p>
                    <nav>
                        <ul className="flex space-x-4 text-sm">
                            <li><Link to="/privacy" className="hover:underline">Gizlilik Politikası</Link></li>
                            <li><Link to="/terms" className="hover:underline">Kullanım Şartları</Link></li>
                            <li><Link to="/contact" className="hover:underline">İletişim</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    )
}