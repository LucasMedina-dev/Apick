export interface ApickStruct{
    username:string;
    title:string;
    imageUrl:string;
    description:string;
    active:Boolean;
    valoration:Number;
    endpoint:Array<Endpoint>;
}
interface Endpoint{
    endpoint:string;
    active:boolean;
}