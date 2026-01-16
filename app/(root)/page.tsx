import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();

  console.log(session?.id);

  let posts = [];
  
  try {
    const { data } = await sanityFetch({ query: STARTUPS_QUERY, params });
    posts = data || [];
  } catch (error) {
    console.log("Sanity not configured, using mock data", error);
    // Mock data for development
    posts = [
      {
        _id: "1",
        title: "Sample Startup",
        slug: { current: "sample-startup" },
        _createdAt: new Date().toISOString(),
        author: {
          _id: "author1",
          name: "John Doe",
          image: "https://via.placeholder.com/150",
          bio: "Entrepreneur"
        },
        views: 42,
        description: "This is a sample startup for development",
        category: "Technology",
        image: "https://via.placeholder.com/400x200"
      }
    ];
  }

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>

      {/* Only render SanityLive if Sanity is properly configured */}
      {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your-project-id' && <SanityLive />}
    </>
  );
}
