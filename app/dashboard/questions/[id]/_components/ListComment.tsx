import { formatDate } from '@/app/utils/formatDate'
import { prisma } from '@/app/utils/prisma'
import React from 'react'

interface Answer {
  questionId: number
  answerId: number
}

const ListComment = async ({ questionId, answerId }: Answer) => {
  const comments = await prisma.comment.findMany({
    where: {
      questionId: questionId,
      answerId: answerId
    },
    include: {
      user: true
    }
  })
  return (
    <>
    {comments.length > 0 && (
    <div className='component'>
      {comments.map((comment, i) => (
      <div key={i} className="comments mt-5">
        <div className="list border-t border-gray-200 py-2 pl-5">
          <p className='text-sm'>{comment.content} - {comment.user.name} <span className='text-gray-400'>{formatDate(comment.created_at)}</span></p>
        </div>
      </div>
      ))}
    </div>
    )}
    </>
  )
}

export default ListComment