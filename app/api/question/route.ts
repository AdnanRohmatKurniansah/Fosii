import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/utils/prisma';
import { uploadImage } from '@/app/utils/uploadImg';
import { QuestionSchema } from '@/app/validations/QuestionValidation';
import { ZodError } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { validateFile } from '@/app/utils/validateFile'
import { generateUniqueSlug } from '@/app/utils/generateSlug';

export const GET = async () => {
  try {
    const questions = await prisma.question.findMany({
      orderBy: {
        id: 'desc'
      }
    })
    return NextResponse.json({
      data: questions
    })
  } catch (error) {
    return NextResponse.json({
      error: error
    }, {status: 500})
  }
}

export const POST = async (req: NextRequest) => {
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
    
    const requestData = QuestionSchema.parse({
      title: formData.get('title'),
      description: formData.get('description'),
      tagId: isNaN(tagId) ? null : tagId,
      pic: formData.get('pic')
    });

    const slug = await generateUniqueSlug(requestData.title)

    if (requestData.pic) {
      const fileValidationResult = validateFile(requestData.pic)
      if (fileValidationResult) {
        return NextResponse.json({
          message: fileValidationResult.message
        }, { status: fileValidationResult.status })
      }

      const destinationFolder = 'public/question'
      filePath = await uploadImage(requestData.pic, destinationFolder) 
    } else {
      return NextResponse.json({
        error: 'No file uploaded',
      }, { status: 400 })
    }

    if (filePath) {
      const question = await prisma.question.create({
        data: {
          title: requestData.title,
          slug,
          description: requestData.description,
          tagId: requestData.tagId,
          userId: session.user.id,
          pic: filePath
        },
      }) 

      return NextResponse.json({
        message: 'Your question has been send',
        data: question,
      })
    } else {
      return NextResponse.json({
        error: 'File upload failed',
      }, { status: 400 })
    }
  } catch (error) {
    console.log(error)
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
