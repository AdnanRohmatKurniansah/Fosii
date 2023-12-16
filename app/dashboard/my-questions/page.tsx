import LayoutDashboard from '@/app/components/LayoutDashboard'
import React from 'react'
import MyQuestionsCard from './_components/MyQuestionsCard'

const MyQuestions = () => {
  return (
    <LayoutDashboard>
        <div className='my-questions'>
            <MyQuestionsCard />
        </div>
    </LayoutDashboard>
  )
}

export default MyQuestions