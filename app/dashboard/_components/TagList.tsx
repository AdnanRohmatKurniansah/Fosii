'use client'

import { Badge, Card, Button } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import TagSkeleton from './TagSkeleton';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Tag {
  id: number;
  name: string;
}

const TagList = () => {
  const [displayTag, setDisplayTag] = useState(40)
  const useTag = () => useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: () => axios.get('/api/tag').then((res) => res.data.data),
    staleTime: 60 * 1000,
    retry: 3,
  })

  const loadMore = () => {
    setDisplayTag(displayTag + 10)
  }

  const { data: tags, error, isLoading } = useTag()

  if (isLoading) return <TagSkeleton/>

  if (error || !tags) return null

  return (
    <Card className="tag-list col-span-1 md:col-span-2 lg:col-span-1 mb-5">
      <h1 className="text-2xl">Tags</h1>
      <div className="list my-5">
        {tags.slice(0, displayTag).map((tag, i) => (
          <Link key={i} href={`/dashboard/questions/tagged/${tag.name}`}>
            <Badge variant="soft" className="mr-2 hover:cursor-pointer hover:text-blue-500">
              {tag.name}
            </Badge>
          </Link>
        ))}
      </div>
      {displayTag < tags.length && (
        <div className="flex justify-center">
         <Button variant="solid" onClick={loadMore}>
           Load More
         </Button>
       </div>
      )}
    </Card>
  )
}

export default TagList;
