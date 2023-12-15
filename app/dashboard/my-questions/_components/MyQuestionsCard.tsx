'use client'

import { Badge, Button, Card } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import MyQuestionsSkeleton from './MyQuestionsSkeleton'
import { MyQuestion } from '@/app/types/types'
import { formatDate } from '@/app/utils/formatDate'
import Link from 'next/link'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const MyQuestionsCard: React.FC = () => {
  const useQuestion = () => useQuery<MyQuestion[]>({
    queryKey: ['questions'],
    queryFn: () => axios.get('/api/myquestions').then((res) => res.data.data),
    staleTime: 60 * 1000,
    retry: 3,
  })

  const { data: questions, error, isLoading } = useQuestion()

  if (isLoading) return <MyQuestionsSkeleton /> 

  if (error || !questions) return null
  
  return (
    <>  
        {questions.map((question, i) => (
            <Card key={i} className='questionstagName p-4 mb-5'>
              <div className="actions mb-4 flex justify-end">
                <Button size={'1'} variant='solid' color='green'>
                  <Link href={`/dashboard/questions/edit/${question.id}`}>
                    <AiFillEdit />
                  </Link>
                </Button>
                <div className="ml-2"> 
                  <Button variant='solid' color='crimson' size={'1'}>
                    <AiFillDelete />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Badge variant="soft">{question.tagName}</Badge>
                <Badge color={question.status == 'Open' ? 'blue' : 'crimson'} variant="outline">{question.status}</Badge>
              </div>
              <h1 className="text-md my-3">{question.title}</h1>
              <div className="flex justify-between items-center">
                  <div className="answers">
                      <p className='text-sm'>{question.answersCount} answers</p>
                  </div>
                  <div className="user">
                      <small className="name">{formatDate(question.created_at)}</small>
                  </div>
              </div>
            </Card>
          ))
        }
    </>
  )
}

export default MyQuestionsCard