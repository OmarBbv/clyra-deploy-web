export interface IUserInfo {
  id: string;
  name: string;
  surname: string;
  email: string;
  mobile: string;
  profileImg?: any;
  location?: any;
  interests?: any;
  occupation?: any;
}

export interface IStories {
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

export interface ILessons {
  _id: string;
  name: string;
  description: string;
  images: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}
