export interface Movie{
    id: string;
    title: string;
    year?: string;
    poster?: string;
    trailer?: string;
    [key:string] : any;
}