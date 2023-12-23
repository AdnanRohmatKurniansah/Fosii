import LayoutDashboard from '@/app/components/LayoutDashboard'
import { formatDate } from '@/app/utils/formatDate'
import { prisma } from '@/app/utils/prisma'
import { Badge } from '@radix-ui/themes'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import Answers from './_components/Answers'
import MarkDown from '@/app/components/MarkDown'

interface Params {
  params: {
    slug: string
  }
}

const fetchQuestion = cache((slug: string) => prisma.question.findUnique({
  where: {
      slug: slug
  },
  include: {
    tag: true,
    answers: {
      select: {
        id: true,
      },
    },
  },
}))

const DetailQuestion = async ({ params }: Params) => {
  const question = await fetchQuestion(params.slug)

  if (!question) {
    notFound()
  }
  
  const formattedQuestions = {
    id: question.id,
    title: question.title,
    description: question.description,
    pic: question.pic,
    status: question.status,
    answerCount: question.answers.length,
    tagName: question.tag.name, 
    created_at: question.created_at,
    updated_at: question.updated_at
  }
  
  return (
    <LayoutDashboard>
      <div className='questions mt-10'>
        <div className="pic flex justify-center">
            <Image className='rounded-lg' alt='Question image' src={`/${formattedQuestions.pic}`} width={600} height={600}/>
        </div>
        <div className="detail">
            <Badge className='status my-2' variant='solid' color={formattedQuestions.status == 'Open' ? 'blue' : 'red' }>{formattedQuestions.status}</Badge>
            <h1 className='text-2xl'>{formattedQuestions.title}</h1>
            <div className="block md:flex lg:flex justify-between items-center mt-2">
                <Badge className='tag mb-2 md:mb-0' variant='outline'>{formattedQuestions.tagName}</Badge>
                <div className="info flex">
                    <small className='created_at mr-3'>Asked: {formatDate(formattedQuestions.created_at)}</small>
                    <small className='updated_at'>Modified: {formatDate(formattedQuestions.updated_at)}</small>
                </div>
            </div>
        </div>  
        <div className="description mt-5">
          <MarkDown content={formattedQuestions.description} />
        </div>
      </div>
      <Answers answerCount={formattedQuestions.answerCount} questionId={formattedQuestions.id}/>
    </LayoutDashboard>
  )
}



export default DetailQuestion