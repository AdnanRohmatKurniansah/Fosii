'use client'

import { Badge, Button, Card } from '@radix-ui/themes'
import { InvalidateQueryFilters, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import MyQuestionsSkeleton from './MyQuestionsSkeleton'
import { MyQuestion } from '@/app/types/types'
import { formatDate } from '@/app/utils/formatDate'
import Link from 'next/link'
import { AiFillEdit } from 'react-icons/ai'
import DeleteButton from '../../questions/_components/DeleteButton'
import { alert } from '@/app/components/Toast'
import CloseButton from '../../questions/_components/CloseButton'

type Data = {
   questionId: number
}

const MyQuestionsCard: React.FC = () => {
  const queryClient = useQueryClient()
  const useQuestion = () => useQuery<MyQuestion[]>({
    queryKey: ['questions'],
    queryFn: () => axios.get('/api/myquestions').then((res) => res.data.data),
    staleTime: 60 * 1000,
    retry: 3,
  })

  const { data: questions, error, isLoading } = useQuestion()

  const handleQuestionDelete = async (id: number) => {
    try {
      queryClient.setQueryData<MyQuestion[]>(['questions'], (oldData) =>
        oldData?.filter((question) => question.id !== id) || []
      )
      const response = await axios.delete(`/api/question/${id}`)
      alert(response.data.message, 'success')
      queryClient.invalidateQueries(['questions'] as InvalidateQueryFilters)
    } catch (error) {
      console.error('An error occurred during question deletion:', error)
    }
  }

  if (isLoading) return <MyQuestionsSkeleton /> 

  if (error || !questions) return null
  
  const closeQuestion = async (data: Data) => {
    try {
        queryClient.setQueryData<MyQuestion[]>(['questions'], (oldData) =>
          oldData?.filter((question) => question.id !== data.questionId) || []
        )
        const response = await axios.post('/api/question/close', data)
        alert(response.data.message, 'success')
        queryClient.invalidateQueries(['questions'] as InvalidateQueryFilters)
      } catch (error) {
        console.error('An error occurred during question deletion:', error)
      }
  }
  
  return (
    <>  {questions.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
          {questions.map((question, i) => (
            <Card key={i} className='questionstagName p-4 mb-5'>
              <div className="flex justify-between items-center">
                <div className="close mb-4">
                  {question.status != 'Solved' && (
                    <CloseButton onClick={() => closeQuestion({ questionId: question.id })} />
                  )}
                </div>
                <div className="actions mb-4 flex justify-end">
                  <Button variant='solid' color='green'>
                    <Link href={`/dashboard/questions/edit/${question.id}`}>
                      <AiFillEdit />
                    </Link>
                  </Button>
                  <div className="ml-2"> 
                    <DeleteButton onDelete={() => handleQuestionDelete(question.id)}/>
                  </div>
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
        </div>
        ):(
          <div className="flex flex-col text-center justify-center items-center my-60">
            <h1 className='text-3xl'>You havent asked any questions at all</h1>
          </div>
        )}
        
    </>
  )
}

export default MyQuestionsCard