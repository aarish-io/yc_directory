'use server'

import {auth} from "@/auth";
import {parseServerActionResponse} from "@/lib/utils";
import slugify from "slugify";
import {writeClient} from "@/sanity/lib/write-client";

export const createPitch = async(
    state:any,
    form: FormData,
    pitch:string,
)=>{
    const session = await auth();

    if(!session){
        return parseServerActionResponse({
            error:"You must be logged in to do that",
            status:"ERROR",
        });
    }

    const {title,description,category,link} = Object.fromEntries(
        Array.from(form).filter(([key])=>key !== "pitch"),
    );

    const slug = slugify(title as string,{lower:true,strict:true});

    try {
        const startup ={
            _type: 'startup',
            title,
            description,
            category,
            image:link,
            slug:{
                _type:'slug',
                current:slug
            },
            pitch,
            views: 0,
            author:{
                _type:'reference',
                _ref:session?.id,
            }
        }

        console.log('Creating startup with data:', startup);
        const result = await writeClient.create({_type:'startup',...startup});
        console.log('Sanity create result:', result);

        return parseServerActionResponse({
            ...result,
            error:"",
            status:"SUCCESS",
        })

    }
    catch (error) {
        console.error('Error creating startup:', error);
        console.error('Error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            formData: {
                title,
                description,
                category,
                link,
                pitchLength: pitch?.length
            }
        });
        return parseServerActionResponse({
            error : JSON.stringify(error),
            status : "ERROR",
        })
    }
}