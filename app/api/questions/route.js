import { connectToDB } from "@utils/db";
import Question from "@models/question";
import { getServerSession } from "next-auth";
import { authConfig } from "@app/api/auth/[...nextauth]/route";

export async function GET() {
    try {
        await connectToDB();
        const questions = await Question.find({}).populate('creator');
        return new Response(JSON.stringify(questions), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to process the request", { status: 500 });
    }
}

export async function POST(req) {
    const { userId, title, body, tag } = await req.json();
    const session = await getServerSession(authConfig);
    if (!session) return new Response("You must be logged in", { status: 401 });
    try {
         await connectToDB();
         const newQuestion = new Question({
            creator: userId,
            title,
            body,
            tag,
         });

         await newQuestion.save();
         return new Response(JSON.stringify(newQuestion), { status: 201 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to process the request", { status: 500 });
    }
}