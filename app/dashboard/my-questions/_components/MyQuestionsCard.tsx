'use client'

import { Badge, Button, Card } from '@radix-ui/themes'
import axios from 'axios'
import React from 'react'
import { MyQuestion } from '@/app/types/types'
import { formatDate } from '@/app/utils/formatDate'
import Link from 'next/link'
import { AiFillEdit } from 'react-icons/ai'
import DeleteButton from '../../questions/_components/DeleteButton'
import { alert } from '@/app/components/Toast'
import CloseButton from '../../questions/_components/CloseButton'
import { useRouter } from 'next/navigation'

interface Data {
   questionId: number
}

interface Questions {
  questions: MyQuestion[]
}

const MyQuestionsCard = ({ questions }: Questions) => {
  const router = useRouter()
  const handleQuestionDelete = async (id: number) => {
    await axios.delete(`/api/question/${id}`)
      .then(({data}) => {
        alert(data.message, 'success')
        router.push('/dashboard/my-questions')
        router.refresh()
      }).catch(({response}) => {  
        alert(response.data.message, 'error')
      })
  }
  
  const closeQuestion = async (data: Data) => {
    await axios.post('/api/question/close', data)
      .then(({data}) => {
        alert(data.message, 'success')
        router.push('/dashboard/my-questions')
        router.refresh()
      }).catch(({response}) => {  
        alert(response.data.message, 'error')
      })
  }
  
  return (
    <div className={`${questions.length < 6 ? 'mb-20 md:mb-48' : ''}`}>  
    {questions.length > 0 ? (
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
                    <Link href={`/dashboard/questions/edit/${question.slug}`}>
                      <AiFillEdit />
                    </Link>
                  </Button>
                  <div className="ml-2"> 
                    <DeleteButton onDelete={() => handleQuestionDelete(question.id)}/>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Link href={`/dashboard/questions/tagged/${question.tagName}`}>
                  <Badge variant="soft" className="mr-2 hover:cursor-pointer hover:text-blue-500">
                    {question.tagName}
                  </Badge>
                </Link>
                <Badge color={question.status == 'Open' ? 'blue' : 'crimson'} variant="outline">{question.status}</Badge>
              </div>
              <Link href={`/dashboard/questions/${question.slug}`}>
                <h1 className="text-md my-3">{question.title}</h1>
              </Link>
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
    </div>
  )
}

export default MyQuestionsCard