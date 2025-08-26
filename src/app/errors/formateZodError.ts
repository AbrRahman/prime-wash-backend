import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericErrorResponse } from "../interface/interface.error";
import HttpStatus  from "http-status";
export const formateZodError=(error:ZodError):TGenericErrorResponse=>{
    const errorSource:TErrorSource=error?.issues?.map((issue:ZodIssue)=>{
        return{
            path:issue?.path[issue?.path?.length-1],
            message:issue?.message
          }
    })
    
    return{
        statusCode:HttpStatus.BAD_REQUEST,
        message:'Validation failed',
        errorSource
     }
}