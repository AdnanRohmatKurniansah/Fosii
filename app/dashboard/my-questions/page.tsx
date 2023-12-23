import LayoutDashboard from '@/app/components/LayoutDashboard'
import React from 'react'
import MyQuestionsCard from './_components/MyQuestionsCard'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/app/utils/prisma'

const MyQuestions = async () => {
  const session = await getServerSession(authOptions)
  const questions = await prisma.question.findMany({
    where: {
        userId: session?.user.id,
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
  return (
    <LayoutDashboard>
        <div className='my-questions'>
            <MyQuestionsCard questions={formattedQuestions}/>
        </div>
    </LayoutDashboard>
  )
}

export default MyQuestions