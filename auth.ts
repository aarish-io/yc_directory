import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import {client} from "@/sanity/lib/client";
import {AUTHOR_BY_GITHUB_USERNAME} from "@/sanity/lib/queries";
import {writeClient} from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub],
    callbacks: {

        async signIn({profile: {id, login, bio}, user: {name, email, image}}) {
            const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_USERNAME, {
                id,
            })

            if (!existingUser) {
                await writeClient.create({
                        _type: "author",
                        id,
                        name,
                        email,
                        username: login,
                        image,
                        bio: bio || "",
                    }
                );
            }
            return true;
        },

        async jwt({token, account, profile}) {
            if (account && profile) {
                const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_USERNAME, {
                    id: profile?.id,
                });

                token.id = user?._id;
            }
            return token;
        },

        async session({session, token}) {
            Object.assign(session, {id: token.id})
            return session;
        }
    }
});