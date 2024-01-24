import { connectToDB } from "@utils/db";
import Question from "@models/question";
import { getServerSession } from "next-auth";
import { config } from "@app/api/auth/[...nextauth]/route";


export async function GET(req, { params }) {
    const session = await getServerSession(config);
    if (!session) return new Response("You must be logged in.", { status: 401 });
    try {
        await connectToDB();
        const question = await Question.findById(params.id).populate('creator');
        if (!question) return new Response("Question not found", { status: 404 });
        return new Response(JSON.stringify(question), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to process the request", { status: 500 });
    }
}

export async function PATCH(req, { params }) {
    const session = await getServerSession(config);
    const { title, body, tag } = await req.json();
    
    if (!session) return new Response("You must be logged in.", { status: 401 });
    try {
        await connectToDB();
        const existingQuestion = await Question.findById(params.id);
        if (!existingQuestion) return new Response("Question not found", { status: 404 });
        
        existingQuestion.title = title || existingQuestion.title;
        existingQuestion.body = body || existingQuestion.body;
        existingQuestion.tag = tag || existingQuestion.tag;

        await existingQuestion.save();
        
        return new Response(JSON.stringify(existingQuestion), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to process the request", { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const session = await getServerSession(config);
    if (!session) return new Response("You must be logged in.", { status: 401 });
    try {
        await connectToDB();

        await Question.findByIdAndDelete(params.id);
        return new Response("Question deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Failed to process the request", { status: 500 });
    }
}