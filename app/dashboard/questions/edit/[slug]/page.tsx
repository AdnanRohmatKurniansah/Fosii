import LayoutDashboard from '@/app/components/LayoutDashboard'
import React from 'react'
import AskForm from '../../_components/AskForm'
import { prisma } from '@/app/utils/prisma'
import { notFound } from 'next/navigation'

interface Params {
  params: {
    slug: string
  }
}

const EditQuestions = async ({ params }: Params) => {
  const question = await prisma.question.findUnique({
    where: {
        slug: params.slug
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

export default EditQuestions