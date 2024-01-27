'use client';

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';

import Form from '@components/Form';

const page = () => {
    const router = useRouter();
    const params = useParams();
    const questionId = params.id;
    const { data: session, status } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        title: '',
        body: '',
        tag: '',
    });

    useEffect(() => {
        if (status === "unauthenticated") router.push('/auth/signin');
    }, [status]);

    useEffect(() => {
        async function fetchQuestion() {
            const response = await fetch(`/api/questions/${questionId}`);
            const data = await response.json();

            setPost({
                title: data.title,
                body: data.body,
                tag: data.tag,
            });
        }
        if (questionId) fetchQuestion();
    }, [questionId]);

    async function updatePost(e){
        e.preventDefault();
        setSubmitting(true);

        if (!questionId) return alert("Question ID not found");
        try {
            const response = await fetch(`/api/questions/${questionId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    title: post.title,
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
    <Form title="Edit your question" post={post} setPost={setPost} submitting={submitting} handler={updatePost}>

    </Form>
  )
}

export default page