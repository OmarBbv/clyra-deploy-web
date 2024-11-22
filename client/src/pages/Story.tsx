import { BreadcrumbDemo } from "@/components/Breadcrumb";
import BASE_API from "@/utils/apiConfig";
import { useQuery } from "@tanstack/react-query";
import MDEditor from '@uiw/react-md-editor';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "@/contexts/ThemeProvider";
import { useParams } from "react-router-dom";

interface IStory {
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

const fetchStoriesId = async (id: string) => {
    const res = await BASE_API.get(`/stories/${id}`);
    return res.data.data
}

const Story = () => {
    const { id } = useParams();
    const { theme } = useTheme();

    const { data: story, isLoading } = useQuery<IStory>({
        queryKey: ['get/story:id', id],
        queryFn: () => {
            if (!id) {
                throw new Error('ID is required');
            }
            return fetchStoriesId(id);
        },
    })

    if (isLoading) {
        return <StorySkeletonLoader />
    }

    return (
        <div className="container mx-auto sm:px-4 sm:py-8">
            <div className="mb-6 mt-2">
                <BreadcrumbDemo />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>{story?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div data-color-mode={theme}>
                        <MDEditor.Markdown
                            className="p-8 rounded-lg w-full"
                            source={story?.content}
                        />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2" aria-label="Story tags">
                        {story?.tags.flatMap((item, index) =>
                            item.split(',').map((subItem, subIndex) => (
                                <Badge key={`${index}-${subIndex}`} variant="secondary">
                                    {subItem.trim()}
                                </Badge>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

const StorySkeletonLoader = () => (
    <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-64 mb-6" />
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-64 w-full mb-4" />
                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-6 w-20" />
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
)

export default Story