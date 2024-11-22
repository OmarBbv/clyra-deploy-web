import { useMemo, useCallback, useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useForm, Controller } from "react-hook-form"
import { Search, Star, X } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import BASE_API from "@/utils/apiConfig"
import { Link } from "react-router-dom"

interface ISearchProps {
    _id: string;
    title: string;
    description: string;
    content: string;
    tags: string[];
    likes: number;
    images: string;
    views: number;
    lessonId: string;
    comments: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface IApitype {
    success: boolean;
    message: string;
    data: ISearchProps[];
}

interface FormValues {
    filter: string;
}

const fetchSearchData = async (filter: string) => {
    if (!filter.trim()) return [];
    try {
        const response = await BASE_API.get<IApitype>(`/stories/search?title=${encodeURIComponent(filter.trim())}`);

        if (response.status !== 200) throw new Error("Veri çekme hatası");
        return response.data.data;
    } catch (error: any) {
        console.error("API çağrı hatası:", error.message);
        throw new Error(error.message);
    }
};

export default function SearchPopup() {
    const { control, watch } = useForm<FormValues>({
        defaultValues: {
            filter: '',
        },
    });

    const filter = watch('filter');
    const [isOpen, setIsOpen] = useState(false);
    const [debouncedFilter, setDebouncedFilter] = useState<string>('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilter(filter.trim());
        }, 300);

        return () => clearTimeout(timer);
    }, [filter]);

    const { data: search, isLoading, isError } = useQuery<ISearchProps[]>({
        queryKey: ['get/searchData', debouncedFilter],
        queryFn: () => fetchSearchData(debouncedFilter),
        enabled: !!debouncedFilter && isOpen
    });

    const handleLinkClick = useCallback(() => {
        setIsOpen(false);
    }, []);

    const renderSearchResults = useMemo(() => {
        if (!debouncedFilter) return null;
        if (isLoading) return <div className="text-center py-4">Yükleniyor...</div>;
        if (isError) return <div className="text-center py-4 text-red-500">Arama sırasında bir hata oluştu</div>;
        if (!Array.isArray(search) || search.length === 0) return <div className="text-center py-4">Ops! Farklı şeyler aramayı deneyebilirsin 😁</div>;

        return (
            <ul className="space-y-4">
                {search.map((item) => (
                    <li key={item._id} className="flex items-center justify-between px-2 hover:bg-accent text-accent-foreground rounded-lg">
                        <div className="flex items-center space-x-2">
                            <Link
                                to={`/stories/${item._id}`}
                                onClick={handleLinkClick}
                            >
                                {item.title}
                            </Link>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon" aria-label="Favori">
                                <Star className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" aria-label="Kaldır">
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }, [search, isLoading, isError, handleLinkClick, debouncedFilter]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                    <Search className="w-5 h-5 mr-2" />
                    <span className="truncate">Dersleri Ara</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[40%] max-w-3xl rounded-lg top-[35%]">
                <DialogHeader>
                    <DialogTitle>Ders Ara</DialogTitle>
                    <DialogDescription>Çeşitli konular için kaynaklar ve dokümantasyon bulun.</DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                    <Controller
                        name="filter"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="Dokümantasyon ara"
                                aria-label="Arama"
                            />
                        )}
                    />
                    {debouncedFilter && <div className="text-sm text-muted-foreground">Sonuçlar</div>}
                    {renderSearchResults}
                    <div className="text-sm text-muted-foreground text-right">
                        Search by <span className="text-primary">Clyra</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}