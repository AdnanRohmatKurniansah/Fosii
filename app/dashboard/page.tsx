import React from 'react'
import LayoutDashboard from '../components/LayoutDashboard'
import TopQuestions from './_components/TopQuestions'
import TagList from './_components/TagList'

const Dashboard = () => {
  return (
    <LayoutDashboard>
      <div className='questions grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
        <TopQuestions />
        <TagList />
      </div>
    </LayoutDashboard>
  )
}

export default Dashboard