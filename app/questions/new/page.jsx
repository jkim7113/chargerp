'use client';

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const page = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        title: '',
        body: '',
        tag: [],
    });

    useEffect(() => {
        if (status === "unauthenticated") router.push('/auth/signin');
    }, [status])

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
    <Form title="Ask a question" post={post} setPost={setPost} submitting={submitting} handler={createPost}>
    </Form>
  )
}

export default page