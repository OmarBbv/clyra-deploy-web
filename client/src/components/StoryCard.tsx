import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StoryCardProps {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
    views?: number;
}

const StoryCard: React.FC<StoryCardProps> = ({ title, description, imageUrl, date, id, views }) => {
    return (
        <Link to={`/stories/${id}`}>
            <Card className="max-w-full sm:max-w-72 cursor-pointer overflow-hidden flex-1 hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="p-0">
                    <img className="w-full h-40 object-cover" src={imageUrl} alt={title} draggable={false} />
                </CardHeader>
                <CardContent className="p-4">
                    <CardTitle className="text-xl font-semibold line-clamp-1">{title}</CardTitle>
                    <CardDescription className="mt-2 text-muted-foreground line-clamp-2">{description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-4 border-t">
                    <p className="text-gray-600 text-sm">{date}</p>
                    <Badge variant="secondary">{views} görüntülendi</Badge>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default StoryCard;
