export interface EndpointStruct{
    _id?:string;
    username:string;
    active:Boolean;
    title:string;
    endpoint:string;
    methods:Array<string>;
    docs:any
}