import React from 'react'
import {cn, formatDate} from '@/lib/utils';
import {EyeIcon} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {Startup,Author} from "@/sanity/types";
import {Skeleton} from "@/components/ui/skeleton";
import {Button} from "@/components/ui/button";



export type StartUpTypeCard = Omit<Startup,"author"> & {author?:Author}

const StartupCard = ({post}:{post:StartUpTypeCard}) => {

    const {_id,title,author,image,category,_createdAt,description,views}=post;

    return (
        <li className="startup-card group">
            <div className="flex-between">
                <p className="startup_card_date">
                    {formatDate(_createdAt)}
                </p>
                <div className="flex gap-1.5">
                    <EyeIcon className="size-6 text-primary"/>
                    <span className="text-16-medium">{views}</span>
                </div>
            </div>
            <div className="mt-5 flex-between gap-5 ">
                    <div className="flex-1">
                        <Link href={`/user/${author?._id}`}>
                            <p className="text-16-medium line-clamp-1">{author?.name}</p>
                        </Link>
                        <Link href={`/startups/${_id}`}>
                            <h3 className="text-26-semibold">{title}</h3>
                        </Link>
                    </div>
                    
                    <Link href={`/user/${author?._id}`}>
                        <Image src={author?.image!} alt={author?.name!} height={48} width={48} className="rounded-full"/>
                    </Link>

            </div>

            <Link href={`/startups/${_id}`}>
                <p className="startup_card_desc ">{description}</p>
                <img src={image} alt="placeholder" className="startup-card_img"/>
            </Link>

            <div className="flex-between mt-5 gap-3">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className="text-16-medium capitalize text-primary">{category}</p>
                </Link>
                <Button className="startup-card_btn" asChild>
                    <Link href={`/startups/${_id}`}>Read More</Link>
                </Button>
            </div>

        </li>
    )
}
export const StartupCardSkeleton=()=>{
    return(
        <>
            {[0, 1, 2, 3, 4].map((index) => (
                <li key={cn("skeleton",index)}>
                    <Skeleton className="startup-card_skeleton"/>
                </li>
            ))}
        </>
    )
}

export default StartupCard
