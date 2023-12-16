import { prisma } from "@/app/utils/prisma"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    try {
        const request = await req.json()
        const question = await prisma.question.findUnique({
            where: {
                id: request.questionId
            }
        })

        if (!question) {
            return NextResponse.json({
                message: 'Question not found'
            }, {status: 404})
        }
        
        const response = await prisma.question.update({
            where: {
                id: question.id
            }, 
            data: {
                status: 'Solved'
            }
        })

        return NextResponse.json({
            message: 'Question has been closed',
            data: response
        })
    } catch (error) {
        return NextResponse.json({
            message: error
        }, {
            status: 500
        })
    }
}