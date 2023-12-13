import React from 'react'
import LayoutDashboard from '@/app/components/LayoutDashboard'
import AskForm from '../_components/AskForm'
import { Card } from '@radix-ui/themes'
import { AiFillEdit } from 'react-icons/ai'

const AddNewQuestion = () => {
  return (
    <LayoutDashboard>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-6'>
          <div className="form col-span-1 md:col-span-2 lg:col-span-2">
            <h1 className='text-2xl mb-10'>Ask a public question</h1>
            <Card className='p-4 mb-5'>
              <h1 className='text-2xl mb-5'>Writing a good question</h1>
              <div className="info mb-5">
                <p>You’re ready to ask a programming-related question and this form will help guide you through the process.
                Looking to ask a non-programming question? See the topics here to find a relevant site. </p>
              </div>
            <div className="steps">
              <h1>Steps</h1>
              <ul className='list-disc text-sm p-3'>
                <li>Summarize your problem in a one-line title.</li>
                <li>Describe your problem in more detail.</li>
                <li>Add “tags” which help surface your question to members of the community.</li>
                <li>Review your question and post it to the site.</li>
              </ul>
            </div>
            </Card>
            <AskForm />
          </div>
          <div className="info col-span-1 md:col-span-2 lg:col-span-1 mt-6 md:mt-10 lg:mt-10">
            <Card className='p-4'>
              <p className='mb-5'>Writing a good title </p>
              <div className="info flex justify-between items-center gap-6 mb-5">
                <div className="icon">
                  <AiFillEdit style={{ fontSize: '50px' }} />
                </div>
                <small>You might find that you have a better idea of your title after writing out the rest of the question.</small>
              </div>
            </Card>
          </div>
      </div>
    </LayoutDashboard>
  )
}

export default AddNewQuestion