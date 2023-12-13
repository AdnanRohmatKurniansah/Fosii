import { Badge, Card } from '@radix-ui/themes'
import React from 'react'

const TagList = () => {
  return (
    <Card className="tag-list col-span-1 md:col-span-2 lg:col-span-1 mb-5">
        <h1 className='text-2xl'>Tags</h1>
        <div className="list mt-5">
          <Badge variant="soft" className="mr-2">R</Badge>
          <Badge variant="soft" className="mr-2">Statistic</Badge>
        </div>
    </Card>
  )
}

export default TagList