export interface IPost {
    title: string;
    authorId: number;
    id: number;
    content: string;
    author: User;
    createdAt: any;
    translate:string;
    fileName: string;
}

interface User {
    email: string;
    id: number;
    name: string
}