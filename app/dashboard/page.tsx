import React from 'react'
import LayoutDashboard from '../components/LayoutDashboard'
import TagList from './_components/TagList'
import { Metadata } from 'next'
import { prisma } from '../utils/prisma'
import Pagination from '../components/Pagination'
import { Badge, Button } from '@radix-ui/themes'
import Link from 'next/link'
import { formatDate } from '../utils/formatDate'
import { Props } from '../types/types'

const Dashboard = async ({ searchParams }: Props) => {
  const page = Number(searchParams?.page) || 1
  const pageSize = 15
  const questions = await prisma.question.findMany({
    orderBy: {
      answers: {
        _count: 'desc', 
      },
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
    },
  }) 
  const questionCount = await prisma.question.count()
  const formattedQuestions = questions.map((question) => ({
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
            <h1 className="text-2xl">Top Questions</h1>
            <Button variant="solid">
              <Link href={'/dashboard/questions/ask'}>
                Ask question
              </Link>
            </Button>
          </div>
          <div className="question my-10">
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
                    <Link href={`/dashboard/questions/tagged/${quest.tagName}`}>
                      <Badge variant="soft" className="mr-2 hover:cursor-pointer hover:text-blue-500">
                        {quest.tagName}
                      </Badge>
                    </Link>
                    </div>
                    <div className="user">
                      <small className="name"><span className="text-blue-600">{quest.author}</span> {formatDate(quest.created_at)}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination pageSize={pageSize} currentPage={page} itemCount={questionCount}/>
        </div>
        <TagList />
      </div>
    </LayoutDashboard>
  )
}

export default Dashboard