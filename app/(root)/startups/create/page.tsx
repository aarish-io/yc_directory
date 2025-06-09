import React from 'react'
import StartupForm from "@/components/StartupForm";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

const Page = async () => {
    const session = await auth();

    if(!session?.user) return redirect('/');
    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <h1 className="heading">Create Startup</h1>
            </section>
            <StartupForm/>
        </>

    )
}
export default Page
