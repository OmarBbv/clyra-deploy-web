import { BreadcrumbDemo } from "@/components/Breadcrumb"
import { CardFilter } from "@/components/CardFilter"
import LoadingErrorStates from "@/components/LoadingErrorStates"
import PageMeta from "@/components/PageMeta"
import StoryCard from "@/components/StoryCard"
import { ILessons, IStories } from "@/models/globalModel"
import BASE_API from "@/utils/apiConfig"
import formatDate from "@/utils/formatDate"
import { useQuery } from "@tanstack/react-query"
import React from "react"

interface ICardFilterProps {
    filter: string[]
    setSelectFilter: React.Dispatch<React.SetStateAction<string>>
    selectFilter: string
}

const fetchAllLessons = async () => {
    try {
        const res = await BASE_API.get('/lessons');
        return res.data.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

const fetchAllStory = async (selectFilter: string) => {
    try {
        const encodedFilter = encodeURIComponent(selectFilter); 
        const res = await BASE_API.get('/stories', { params: { title: encodedFilter } });
        return res.data.data;
    } catch (error: any) {
        throw new Error(error);
    }
}


const Stories = () => {
    const [filter, setFilter] = React.useState<string[]>([]);
    const [selectFilter, setSelectFilter] = React.useState<string>('')

    const { data: lessonFilter } = useQuery<ILessons[]>({
        queryKey: ['get/lesson-filter'],
        queryFn: fetchAllLessons
    });

    React.useEffect(() => {
        if (lessonFilter) {
            setFilter(lessonFilter.map(item => item.name));
        }
    }, [lessonFilter]);


    const { data: allStory, isLoading, isError } = useQuery<IStories[]>({
        queryKey: ['get/stories', selectFilter],
        queryFn: () => fetchAllStory(selectFilter)
    });

    const cardFilterValues: ICardFilterProps = {
        setSelectFilter,
        filter,
        selectFilter
    }

    if (isLoading || isError) return <LoadingErrorStates isError={isError} isLoading={isLoading} />

    return (
        <section className="container mx-auto px-4 py-8">
            <PageMeta title='Hikayeler' />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <BreadcrumbDemo />
                <CardFilter {...cardFilterValues} />
            </div>
            <div className="py-5 flex flex-wrap max-w-full mx-auto gap-3">
                {
                    allStory && allStory.length > 0 ? allStory.map(story => {
                        return (
                            <React.Fragment key={story._id}>
                                <StoryCard
                                    id={story?._id}
                                    title={story?.title}
                                    description={story?.description}
                                    imageUrl={story?.images}
                                    date={formatDate(story?.createdAt)}
                                    views={story?.views}
                                />
                            </React.Fragment>
                        )
                    }) : <div>İçerik Boş</div>
                }
            </div>
        </section>
    )
}

export default Stories;
