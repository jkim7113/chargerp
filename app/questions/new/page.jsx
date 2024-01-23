'use client';

import { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const page = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        title: '',
        body: '',
    });

    async function createPost(e){
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/questions', {
                method: "POST",
                body: JSON.stringify({
                    title: post.title,
                    userId: session?.user.id,
                    body: post.body,
                    tag: post.tag,
                }),
            });
            
            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }
  return (
    <Form type="Ask" post={post} setPost={setPost} submitting={submitting} handler={createPost}>

    </Form>
  )
}

export default page