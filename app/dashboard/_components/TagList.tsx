import { prisma } from '@/app/utils/prisma'
import { Badge, Card } from '@radix-ui/themes'
import React from 'react'

const TagList = async () => {
  const tags = await prisma.tag.findMany()
  return (
    <Card className="tag-list col-span-1 md:col-span-2 lg:col-span-1 mb-5">
        <h1 className='text-2xl'>Tags</h1>
        <div className="list mt-5">
          {
            tags.map((tag, i) => (
              <Badge key={i} variant="soft" className="mr-2">{tag.name}</Badge>
            ))
          }
        </div>
    </Card>
  )
}

export default TagList