import React, {Suspense} from 'react'
import {client} from "@/sanity/lib/client";
import {PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY} from "@/sanity/lib/queries";
import {notFound} from "next/navigation";
import {formatDate} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import markdownit from "markdown-it";
import {Skeleton} from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard,{StartUpTypeCard} from "@/components/StartupCard";




const md = new markdownit();
// export const experimental_ppr = true;

const Page = async ({params}:{params:Promise<{id:string}>}) => {
     const id = (await params).id;

    const [post, playlistData] = await Promise.all([
        client.fetch(STARTUP_BY_ID_QUERY, { id }),
        client.fetch(PLAYLIST_BY_SLUG_QUERY, {
            slug: "editor-picks-new",
        }),
    ]);
    
    // Safely extract editorPosts with a null check
    const editorPosts = playlistData?.select || [];

    if(!post) return notFound();

    const parsedContent = md.render(post?.pitch || '');

    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <p className="tag">{formatDate(post?._createdAt)}</p>
                <h1 className="heading">{post.title}</h1>
                <p className="sub-heading !max-w-4xl">{post.description}</p>
            </section>

            <section className="section_container">
                <img src={post.image}
                alt="thumbnail" className="w-full max-h-[65vh] h-auto mx-auto rounded-xl object-cover shadow-md" />

                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3 cursor-pointer">
                            <Image src={post.author.image}
                                   width={64} height={64}
                            alt="author avatar" className="rounded-full drop-shadow-lg" />

                            <div>
                                <p className="text-20-medium font-semibold">{post.author.name}</p>
                                <p className="text-16-light text-gray-700">@{post.author.username}</p>
                            </div>
                        </Link>

                        <p className="category-tag">{post.category}</p>
                    </div>

                    <h3 className="text-30-bold">Pitch details</h3>
                    {parsedContent?(
                        <article className="prose max-w-4xl font-work-sans break-all"
                            dangerouslySetInnerHTML={{__html:parsedContent}}/>
                    ):(
                        <p className="no-result"> No details</p>
                    )}
                </div>

                <hr className="divider"/>

                {editorPosts.length > 0 && (
                    <div className="max-w-4xl mx-auto">
                        <p className="text-30-semibold">Editor Picks</p>

                        <ul className="mt-7 card_grid-sm">
                            {editorPosts.map((post: StartUpTypeCard, i: number) => (
                                <StartupCard key={i} post={post} />
                            ))}
                        </ul>
                    </div>
                )}

                <Suspense fallback={<Skeleton/>}>
                   <View id={id}/>
                </Suspense>

            </section>
        </>
    )
}
export default Page
