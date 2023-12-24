import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from '@/app/utils/authOptions'
import { AddCommenSchema } from "@/app/validations/CommentValidation";
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

      const validationData = AddCommenSchema.safeParse(requestData)
        
      if (!validationData.success) {
        return NextResponse.json(
            { message: 'Validation failed', errors: validationData.error.errors },
            { status: 400 }
        )
      }
      
      requestData.questionId = parseInt(requestData.questionId)
      requestData.answerId = parseInt(requestData.answerId)

      const question = await prisma.question.findUnique({
        where: {
            id: requestData.questionId
        }
      })

      const answer = await prisma.answer.findUnique({
        where: {
            id: requestData.answerId
        }
      })

      if (!question || !answer) {
        return NextResponse.json({
            message: 'Question dan answer not found',
        }, { status: 404 })
      }

      const comment = await prisma.comment.create({
        data: {
            questionId: question.id,
            answerId: answer.id,
            content: requestData.content,
            userId: session.user.id
        }
      })

      return NextResponse.json({
        message: 'Your comment has been sent',
        data: comment
      })
    } catch (error) {
      return NextResponse.json({
        message: error,
      }, { status: 500 })
    }
}