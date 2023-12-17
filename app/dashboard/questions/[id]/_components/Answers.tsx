import React from 'react'
import AnswerForm from './AnswerForm'
import { prisma } from '@/app/utils/prisma'
import ReactMardown from 'react-markdown'
import { formatDate } from '@/app/utils/formatDate'

const Answers = async ({ answerCount, questionId }: {answerCount: number, questionId: number}) => {
  const answers = await prisma.answer.findMany({
    where:{
      questionId: questionId
    },
    include: {
      user: true
    },
    orderBy: {
      id: 'desc'
    }
  })

  return (
    <div className='mt-10'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="list-answer ">
              <h1 className='text-xl mb-3'>{answerCount} Answers</h1>
              {answers.length > 0 ? (
                <>
                {answers.map((answer, i) => (
                  <div key={i} className="border-t border-gray-200 py-4 px-2">
                    <ReactMardown className="mb-3">{answer.content}</ReactMardown>
                    <div className="user flex justify-end">
                        <small className="name"><span className="text-blue-600">{answer.user.name}</span> {formatDate(answer.created_at)}</small>
                    </div>
                  </div>
                ))}
                </>
              ): (
                <div className='text-center flex justify-center items-center my-44'>
                  <h1 className='text-xl'>No one has provided an answer yet</h1>
                </div>
              )}
            </div>
            <div className="answer-form">
                <h1 className='text-xl mb-3'>Your Answer</h1>
                <AnswerForm questionId={questionId}/>
            </div>
        </div>
    </div>
  )
}

export default Answers