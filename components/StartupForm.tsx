'use client'

import {Input} from "@/components/ui/input";
import {useActionState, useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import MDEditor from '@uiw/react-md-editor';
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {formSchema} from "@/lib/validation";
import {z} from "zod";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {createPitch} from "@/lib/action";

const StartupForm = () => {
    const [error, setError] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState<string>('');

    const router = useRouter();


    const handleFormSubmit = async (prevState: { error: string; status: string } | null, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                link: formData.get('link') as string,
                pitch,
            }

            await formSchema.parseAsync(formValues);

            const results =await createPitch(prevState,formData,pitch);
            

            if(results.status === "SUCCESS") {
                toast.success("Your startup pitch has been created successfully");
            }
            router.push(`/startups/${results?._id}`);
            return results;
        }
        catch(error) {
            if(error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setError(fieldErrors as unknown as Record<string, string>);

                toast.error("Please check your inputs and try again");
                return {
                    error: "Validation failed", 
                    status: "ERROR"
                };
            }

            toast.error("An unexpected error has occurred");
            
            return {
                error: 'Unexpected error',
                status: 'ERROR',
            };
        }
    }

    const [, formAction , isPending] = useActionState (handleFormSubmit,{error:'',status:"Initial"});

    return (
        <form action={formAction} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label" >
                    Title
                </label>

                <Input
                id="title"
                name="title"
                className="startup-form_input"
                required
                placeholder="Startup Title"/>
                {error.title && <p className="startup-form_error">{error.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className="startup-form_label" >
                    Description
                </label>
                <Textarea
                    id="description"
                    name="description"
                    className="startup-form_textarea"
                    required
                    placeholder="Description of your startup"/>
                {error.description && <p className="startup-form_error">{error.description}</p>}
            </div>

            <div>
                <label htmlFor="category" className="startup-form_label" >
                    Category
                </label>

                <Input
                    id="category"
                    name="category"
                    className="startup-form_input"
                    required
                    placeholder="Category(Tech, Business, etc.)"/>
                {error.category && <p className="startup-form_error">{error.category}</p>}
            </div>

            <div>
                <label htmlFor="link" className="startup-form_label" >
                    Image URL
                </label>

                <Input
                    id="link"
                    name="link"
                    className="startup-form_input"
                    required
                    placeholder="Startup Image URL"/>
                {error.link && <p className="startup-form_error">{error.link}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label" >
                    Pitch
                </label>

                <MDEditor
                    value={pitch}
                    onChange={(value)=>setPitch(value as string)}
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{overflow: 'hidden',borderRadius:''}}
                    textareaProps={{
                        placeholder:'Write a pitch for your startup',

                    }}
                    previewOptions={{
                        disallowedElements:['styles'],
                    }}


                />

                {error.pitch && <p className="startup-form_error">{error.pitch}</p>}
            </div>
             <Button type="submit" className="startup-form_btn text-white"  disabled={isPending}>
                 {isPending ? 'Loading...' : 'Submit'}
                 <Send className="ml-2 size-6"/>
             </Button>
        </form>
    )
}
export default StartupForm
