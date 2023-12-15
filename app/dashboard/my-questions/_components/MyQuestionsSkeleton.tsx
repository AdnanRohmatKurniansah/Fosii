import React from 'react'
import Skeleton from 'react-loading-skeleton'

const MyQuestionsSkeleton = () => {
  const Questions = [1, 2, 3, 4, 5, 6]
  return (
    <>
        {Questions.map((question, i) => (
            <Skeleton height={'200px'} key={i} />
        ))
        }
    </>
  )
}

export default MyQuestionsSkeleton