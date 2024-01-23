import { connectToDB } from "@utils/db";
import Question from "@models/question";


export async function GET(req, { params }) {
    try {
        await connectToDB();
        const questions = await Question.find({
            creator: params.id
        }).populate('creator');
        return new Response(JSON.stringify(questions), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to process the request", { status: 500 });
    }
}