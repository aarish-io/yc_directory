import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import StartupCard, {StartUpTypeCard} from "@/components/StartupCard";
import {STARTUP_QUERY} from "@/sanity/lib/queries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";
import {auth} from "@/auth";


export default async function Home({searchParams}:{searchParams: Promise<{query?:string}>}) {
    const query = (await searchParams).query;
    const params = {search:query || null};

    const session = await auth();
    console.log(session?.id);

    // const posts = await client.fetch(STARTUP_QUERY);
    const {data:posts} = await sanityFetch({query:STARTUP_QUERY,params});

  return (
    <>
        <section className="pink_container">

            <h1 className="heading">pitch your startup <br />
            connect with entrepreneurs</h1>

            <p className="sub-heading max-w-3xl">
                submit ideas, vote on Pitches, and get noticed in virtual competitions
            </p>

            <SearchForm query={query}/>
        </section>

        <section className="section_container">
            <p className="text-30-semibold">
                {query? `search ressults for "${query}"`: "Discover All the latest tech pitches"}
            </p>

            <ul className="mt-7 card_grid">
                {posts?.length>0?(
                    posts.map((post:StartUpTypeCard)=>(
                        <StartupCard key={post?._id} post={post}/>
                    ))
                ):(
                    <p className="no-results">results not found</p>
                )}
            </ul>
        </section>

        <SanityLive/>

    </>
  );
}
