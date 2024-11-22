import { useQuery } from "@tanstack/react-query"
import { BreadcrumbDemo } from "./Breadcrumb"
import BASE_API from "@/utils/apiConfig"
import { useParams } from "react-router-dom"
import { IStories } from "@/models/globalModel"
import React from "react"
import StoryCard from "./StoryCard"
import formatDate from "@/utils/formatDate"
import LoadingErrorStates from "./LoadingErrorStates"

const fetchLessonDetail = async (id: string) => {
    try {
        const res = await BASE_API.get(`/stories/all/${id}`);
        return res.data.data; 
    } catch (error: any) {
        console.error("Error fetching lesson details:", error);
        throw new Error("Failed to fetch lesson detail");
    }
}

const LessonDetailCard = () => {
    const { id } = useParams();
    const { data: storyById, isError, isLoading } = useQuery<IStories[]>({
        queryKey: ['get/storyById', id],
        queryFn: () => {
            if (!id) {
                throw new Error('ID is required');
            }
            return fetchLessonDetail(id);
        },
        enabled: !!id,
    });

    if (isLoading || isError) return <LoadingErrorStates isError={isError} isLoading={isLoading} />;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex mb-6 mt-2 gap-4">
                <BreadcrumbDemo />
            </div>
            <div className="py-5 flex flex-wrap max-w-full mx-auto gap-3">
                {
                    storyById && storyById.length > 0 ? storyById.map(story => {
                        return (
                            <React.Fragment key={story._id}>
                                <StoryCard
                                    id={story._id}
                                    title={story.title}
                                    description={story.description}
                                    imageUrl={story.images}
                                    date={formatDate(story.createdAt)}
                                />
                            </React.Fragment>
                        )
                    }) : <div>İçerik Boş</div>
                }
            </div>
        </div>
    );
};

export default LessonDetailCard;
