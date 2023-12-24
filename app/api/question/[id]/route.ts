import { Params } from "@/app/types/types"
import { prisma } from "@/app/utils/prisma"
import { uploadImage } from "@/app/utils/uploadImg"
import { QuestionUpdateSchema } from "@/app/validations/QuestionValidation"
import { unlink } from "fs/promises"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import { authOptions } from '@/app/utils/authOptions'
import { validateFile } from "@/app/utils/validateFile"
import { generateUniqueSlug } from "@/app/utils/generateSlug"

export const GET = async (req: NextRequest, {params}: { params: Params }) => {
    const id = parseInt(params.id)
    try {
        const question = await prisma.question.findUnique({
            where: {
                id: id
            }
        })

        if (!question) {
            return NextResponse.json({
                message: 'question not found'
            }, {
                status: 404
            })
        }

        return NextResponse.json({
            message: 'question detail',
            data: question
        })
    } catch (error) {
        return NextResponse.json({
            message: error
        }, {
            status: 500
        })
    }
}

export const PUT = async (req: NextRequest, {params}: { params: Params }) => {
    const id = parseInt(params.id)
    try {
        const formData = await req.formData()
        let filePath: string | undefined 

        const session = await getServerSession(authOptions)

        if (!session) { 
            return NextResponse.json({
                error: 'User not authenticated',
            }, { status: 401 });
        }

        const tagId = parseInt(formData.get('tagId') as string || '', 10);
    
        const requestData = QuestionUpdateSchema.parse({
            title: formData.get('title'),
            description: formData.get('description'),
            tagId: isNaN(tagId) ? null : tagId,
            pic: formData.get('pic')
        })

        const slug = await generateUniqueSlug(requestData.title)

        const Question = await prisma.question.findUnique({
            where: {
                id: id
            }
        })

        if (!Question) {
            return NextResponse.json({
                message: 'question not found'
            }, {
                status: 404
            })
        }

        if (requestData.pic != "undefined") {
            const fileValidationResult = validateFile(requestData.pic)
            if (fileValidationResult) {
                return NextResponse.json({
                message: fileValidationResult.message
                }, { status: fileValidationResult.status })
            }
            const destinationFolder = 'public/question'
            if (Question.pic) {
                await unlink(`public/${Question.pic}`);
            }
            filePath = await uploadImage(requestData.pic, destinationFolder) 
        }
        
        const questionData = {
            title: requestData.title,
            slug,
            description: requestData.description,
            tagId: requestData.tagId,
            pic: filePath || Question.pic, 
        }

        const updatedQuestion = await prisma.question.update({
            where: {
                id: id
            }, 
            data: questionData
        })
        return NextResponse.json({
            message: 'Your question has been updated',
            data: updatedQuestion,
        })
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({
              message: 'Validation error',
              errors: error.errors,
            }, { status: 400 });
          } else {
            return NextResponse.json({
              message: error,
            }, { status: 500 });
          }
    }
}

export const DELETE = async (req: NextRequest, {params}: { params: Params }) => {
    const id = parseInt(params.id)
    try {
        const question = await prisma.question.findUnique({
            where: {
                id: id
            }
        })

        if (question?.pic) {
            await unlink(`public/${question.pic}`)
        }

        const response = await prisma.question.delete({
            where: {
                id: id
            }
        })
        
        return NextResponse.json({
            message: 'Question has been deleted',
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