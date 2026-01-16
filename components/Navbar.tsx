import React from 'react'
import Link from "next/link";
import {signOut,signIn,auth} from "@/auth";
import {BadgePlus, LogOut} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const Navbar =async () => {

    const session = await auth();

    return (
        <header className="px-5 py-3 shadow-sm font-work-sans bg-white">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <img src="/logo.png" alt="logo" width={144} height={30}/>
                </Link>

                <div className="flex gap-5 items-center text-black ">
                    {session && session?.user?(
                        <>
                            <Link href="/startups/create">
                                <span className="max-sm:hidden">Create</span>
                                <BadgePlus className="size-6 sm:hidden"/>
                            </Link>
                            <form action={async()=> {
                                "use server";
                                await signOut({redirectTo:"/"});
                            }} >
                                <span className="max-sm:hidden">Logout</span>
                                <LogOut className="size-6 sm:hidden text-red-700"/>
                            </form>
                            <Link href={`/user/${session?.id}`}>
                                <Avatar className="size-10">
                                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""}/>
                                    <AvatarFallback>Av</AvatarFallback>
                                </Avatar>

                            </Link>
                        </>

                    ):(
                        <form action={async()=> {
                            "use server";
                            await signIn('github');
                        }}>
                            <button type="submit">Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}
export default Navbar
