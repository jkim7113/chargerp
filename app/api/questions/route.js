import { connectToDB } from "@utils/db";
import Question from "@models/question";


export async function GET(req) {
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