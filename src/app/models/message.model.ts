export class Message {
    _id : string;
    title : string;
    content : string;
    attachment: string;
    link: string;
    likes: Number;
    dateCreated: Date;
    dateModified: Date;
    UserId: string;
    User: any;
}