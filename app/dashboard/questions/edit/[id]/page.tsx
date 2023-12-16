import LayoutDashboard from '@/app/components/LayoutDashboard'
import React from 'react'
import AskForm from '../../_components/AskForm'
import { Params } from '@/app/types/types'
import { prisma } from '@/app/utils/prisma'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

const EditQuestions = async ({ params }: {params: Params}) => {
  const question = await prisma.question.findUnique({
    where: {
        id: parseInt(params.id)
    }
  })

  if (!question) {
    notFound()
  }

  return (
    <LayoutDashboard>
      <AskForm question={question} />
    </LayoutDashboard>
  )
}

export const metadata: Metadata = {
    title: 'Fosi - Edit question ',
    description: 'Edit description'
}

export default EditQuestions