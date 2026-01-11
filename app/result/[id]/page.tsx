import { prisma } from "@/lib/prisma";

export default async function Result({params}: any){
    const resume = await prisma.resume.findUnique({
        where: { id: Number(params.id)},
    });

    if(!resume) return <div>Not Found</div>

    return(
        <main className="p-10 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold">Resume Result</h1>
            <p>Final Score: {resume.finalScore.toFixed(2)}</p>
            <p>Rating: {resume.rating}</p>
        </main>
    );
}