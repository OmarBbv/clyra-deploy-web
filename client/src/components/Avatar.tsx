import { Avatar as UIAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProps {
    img?: string,
    name?: string
}

const UserAvatar = ({ img, name='Un' }: UserProps) => {
    return (
        <UIAvatar className="cursor-pointer">
      <AvatarImage className="object-cover" src={img && img} />
      <AvatarFallback className="flex items-center justify-center">
        {name?.toUpperCase().slice(0, 2) || 'AN'}
      </AvatarFallback>
    </UIAvatar>
    );
};

export default UserAvatar;
