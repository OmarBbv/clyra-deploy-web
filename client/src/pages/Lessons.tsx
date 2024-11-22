import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { BreadcrumbDemo } from "../components/Breadcrumb"
import { CardFilter } from "../components/CardFilter"
import React from "react"
import { useQuery } from "@tanstack/react-query"
import BASE_API from "@/utils/apiConfig"
import { ILessons } from "@/models/globalModel"
import { Link } from "react-router-dom"
import formatDate from "@/utils/formatDate"
import { useUser } from "@/contexts/UserProvider"
import { Progress } from "@/components/ui/progress"
import LoadingErrorStates from "@/components/LoadingErrorStates"
import PageMeta from "@/components/PageMeta"

const fetchFilteredLessons = async (filter: string) => {
    try {
        const response = await BASE_API.get('/lessons/filtered-lessons', {
            params: { filter },
        });
        return response.data.data;
    } catch (error: any) {
        throw new Error(error);
    }
};

const fetchAllLessons = async () => {
    try {
        const res = await BASE_API.get('/lessons');
        return res.data.data;
    } catch (error: any) {
        throw new Error(error);
    }
}


export default function Lessons() {
    const { userInfo } = useUser();
    const [filter, setFilter] = React.useState<string[]>([]);
    const [selectFilter, setSelectFilter] = React.useState<string>('')

    const { data: lessons, isLoading, isError } = useQuery<ILessons[]>({
        queryKey: ['get/lesson-filter', selectFilter],
        queryFn: () => fetchFilteredLessons(selectFilter),
    });

    const { data: lessonName } = useQuery<ILessons[]>({
        queryKey: ['get/lesson-filter'],
        queryFn: fetchAllLessons
    });

    React.useEffect(() => {
        if (lessonName) {
            setFilter(lessonName.map(item => item.name));
        }
    }, [lessonName]);

    const cardFilterValues = {
        setSelectFilter,
        selectFilter,
        filter
    };

    if (isLoading || isError) return <LoadingErrorStates isError={isError} isLoading={isLoading} />;

    return (
        <div className="container mx-auto px-4 py-8">
            <PageMeta title="Dersler" />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <BreadcrumbDemo />
                <CardFilter {...cardFilterValues} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {lessons && Array.isArray(lessons) && lessons.map((card) => (
                    <Link key={card?._id} to={`/lessons/${card._id}`}>
                        <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-4 flex items-center space-x-4">
                                <img
                                    src={card?.images}
                                    alt=""
                                    className="w-16 h-16 object-cover rounded-md dark:filter dark:brightness-75 dark:contrast-125"
                                />
                                <div className="flex-1 min-w-0">
                                    <CardTitle className="text-sm font-medium mb-1 truncate capitalize">{card?.slug}</CardTitle>
                                    <CardDescription className="text-xs mb-1 line-clamp-2 capitalize">{card?.description}</CardDescription>
                                    <div className="text-xs text-muted-foreground">{formatDate(card.createdAt)}</div>
                                </div>
                            </CardContent>
                            {userInfo && (
                                <CardContent className="pt-0 flex items-center justify-between flex-wrap">
                                    <Progress value={75} className="w-[60%] h-1 bg-gray-200 dark:bg-gray-700" />
                                    <p className="text-xs text-right mt-1 text-gray-800 dark:text-gray-400">
                                        {75}% Tamamlandı
                                    </p>
                                </CardContent>
                            )}
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
