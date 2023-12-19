import LayoutDashboard from '@/app/components/LayoutDashboard'
import React from 'react'
import AskForm from '../../_components/AskForm'
import { prisma } from '@/app/utils/prisma'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

const EditQuestions = async ({ slug }: {slug: string}) => {
  const question = await prisma.question.findFirst({
    where: {
        slug: slug
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