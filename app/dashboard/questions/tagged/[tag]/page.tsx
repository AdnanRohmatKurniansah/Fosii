import LayoutDashboard from '@/app/components/LayoutDashboard'
import Pagination from '@/app/components/Pagination'
import TagList from '@/app/dashboard/_components/TagList'
import { Props } from '@/app/types/types'
import { formatDate } from '@/app/utils/formatDate'
import { prisma } from '@/app/utils/prisma'
import { Badge, Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface Params {
  params: {
    tag: string
  }
}

type QuestionByTagProps = Params & Props

const QuestionByTag = async ({ params, searchParams }: QuestionByTagProps) => {
  const tag = decodeURI(params.tag)
  const page = Number(searchParams?.page) || 1
  const pageSize = 15
  const questionByTag = await prisma.question.findMany({
    where: {
      tag: {
        name: tag
      }
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      tag: true,
      user: true,
      answers: {
        select: {
          id: true,
        },
      },
    }
  })
  const questionByTagCount = await prisma.question.count({
    where: {
      tag: {
        name: tag
      }
    },
  })
  const formattedQuestions = questionByTag.map((question) => ({
    id: question.id,
    slug: question.slug,
    title: question.title,
    status: question.status,
    tagName: question.tag.name, 
    author: question.user.name,
    answersCount: question.answers.length, 
    created_at: question.created_at,
  }))
  return (
    <LayoutDashboard>
        <div className='questions grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
          <div className="top-questions col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl">Question Tagged [{tag}]</h1>
              <Button variant="solid">
                <Link href={'/dashboard/questions/ask'}>
                  Ask question
                </Link>
              </Button>
            </div>
            <div className="question my-10">
              {formattedQuestions.length > 0 ? (
                <>
                {formattedQuestions.map((quest, i) => (
                  <div key={i} className="list p-4 border-t grid grid-cols-1 md:grid-cols-5 border-gray-200">
                    <div className="response col-span-1">
                      <p className="answers">{quest.answersCount} answers</p>
                      <Badge color={quest.status == 'Open' ? 'blue' : 'red'} variant="outline" className="my-3">{quest.status}</Badge>
                    </div>
                    <div className="title col-span-4">
                      <Link href={`/dashboard/questions/${quest.slug}`}>
                        <h1 className="text-md mb-3">{quest.title}</h1>
                      </Link>
                      <div className="block md:flex lg:flex justify-between items-center">
                        <div className="tags mb-2 md:mb-0">
                          <Badge variant="soft" className="mr-2">{quest.tagName}</Badge>
                        </div>
                        <div className="user">
                          <small className="name"><span className="text-blue-600">{quest.author}</span> {formatDate(quest.created_at)}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                </>
              ): (
                <div className="text-center my-44 items-center flex justify-center">
                  <h1 className='text-xl'>There are no questions tagged by {tag}</h1>
                </div>
              )}
            </div>
            <Pagination pageSize={pageSize} currentPage={page} itemCount={questionByTagCount}/>
          </div>
          <TagList />
        </div>
    </LayoutDashboard>
  )
}
export default QuestionByTag