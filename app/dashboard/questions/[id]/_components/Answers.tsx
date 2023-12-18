import React from 'react'
import AnswerForm from './AnswerForm'
import { prisma } from '@/app/utils/prisma'
import { formatDate } from '@/app/utils/formatDate'
import MarkDown from '@/app/components/MarkDown'

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
      <div className="list-answer max-w-3xl">
        {answers.length > 0 && (
        <>
        <h1 className='text-xl mb-3'>{answerCount} Answers</h1>
        {answers.map((answer, i) => (
          <div key={i} className="border-t border-gray-200 py-4 px-2">
            <MarkDown content={answer.content}/>
            <div className="user flex justify-end mt-5">
                <small className="name"><span className="text-blue-600">{answer.user.name}</span> {formatDate(answer.created_at)}</small>
            </div>
          </div>
        ))}
        </>
        )}
      </div>
      <div className="answer-form mt-5">
          <h1 className='text-xl mb-3'>Your Answer</h1>
          <AnswerForm questionId={questionId}/>
      </div>
    </div>
  )
}

export default Answers