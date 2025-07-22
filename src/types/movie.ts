export interface Movie{
    id: string;
    title: string;
    poster?: string;
    trailer?: string;
    [key:string] : any;
}