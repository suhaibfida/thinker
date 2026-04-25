import {Request,Response} from "express"
import embedder from "./embedderModel"
import prisma  from "@repo/db/prisma"
export const query=async(req:Request,res:Response)=>{
    const query=req.body;
    const vecQuestion= embedder(query);
    const context=await prisma.user.findUnique({
        where:{
            id:req.userId
        },
    })
    if(!context){
        return;
    }
    const vectors=context.vectors as unknown as number[][];
    console.log(vectors)
    
    // Cosine similarity.
    // const arr=[];
    
    // for(let i=0;i<vectors.length;i++){
    //     vectors[i]?[i]





    // }
    
   





}