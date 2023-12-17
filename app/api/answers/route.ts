import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { AddAnswerSchema } from "@/app/validations/AnswerValidation";
import { prisma } from "@/app/utils/prisma";

export const POST = async (req: NextRequest) => {
    try {
      const session = await getServerSession(authOptions)
  
      if (!session) { 
        return NextResponse.json({
          error: 'User not authenticated',
        }, { status: 401 });
      }
  
      const requestData = await req.json()

      const validationData = AddAnswerSchema.safeParse(requestData)
        
      if (!validationData.success) {
        return NextResponse.json(
            { message: 'Validation failed', errors: validationData.error.errors },
            { status: 400 }
        )
      }
      
      requestData.questionId = parseInt(requestData.questionId)

      const question = await prisma.question.findUnique({
        where: {
            id: requestData.questionId
        }
      })

      if (!question) {
        return NextResponse.json({
            message: 'Question not found',
        }, { status: 404 })
      }

      const answer = await prisma.answer.create({
        data: {
            questionId: question.id,
            content: requestData.content,
            userId: session.user.id
        }
      })

      return NextResponse.json({
        message: 'Your answer has been sent',
        data: answer
      })
    } catch (error) {
      return NextResponse.json({
        message: error,
      }, { status: 500 })
    }
}