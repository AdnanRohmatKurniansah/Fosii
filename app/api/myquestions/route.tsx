import { prisma } from "@/app/utils/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"

export const GET = async () => {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({
                message: 'Unauthorized',
            }, { status: 401 })
        }

        const questions = await prisma.question.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                tag: true,
                answers: {
                    select: {
                        id: true,
                    },
                },
            },
        })

        const formattedQuestions = questions.map((question) => ({
            id: question.id,
            slug: question.slug,
            title: question.title,
            description: question.description,
            pic: question.pic,
            status: question.status,
            tagName: question.tag.name, 
            answersCount: question.answers.length, 
            created_at: question.created_at,
            updated_at: question.updated_at,
        }))

        return NextResponse.json({
            message: 'My questions',
            data: formattedQuestions,
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            message: 'Internal Server Error',
        }, { status: 500 })
    }
}
