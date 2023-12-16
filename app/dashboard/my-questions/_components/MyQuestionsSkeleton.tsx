import React from 'react'
import Skeleton from 'react-loading-skeleton'

const MyQuestionsSkeleton = () => {
  const Questions = [1, 2, 3, 4, 5, 6]
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
        {Questions.map((question, i) => (
            <Skeleton height={'200px'} key={i} />
        ))
        }
    </div>
  )
}

export default MyQuestionsSkeleton