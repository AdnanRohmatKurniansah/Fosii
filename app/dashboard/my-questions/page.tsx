import LayoutDashboard from '@/app/components/LayoutDashboard'
import React from 'react'
import MyQuestionsCard from './_components/MyQuestionsCard'

const MyQuestions = () => {
  return (
    <LayoutDashboard>
        <div className='my-questions mt-10 grid grid-cols-1 md:grid-cols-3 gap-6'>
            <MyQuestionsCard />
        </div>
    </LayoutDashboard>
  )
}

export default MyQuestions