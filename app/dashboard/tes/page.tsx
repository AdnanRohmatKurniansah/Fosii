'use client'

import { Question, Tag } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

const useTag = () => useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: () => axios.get('/api/tag').then((res) => res.data.data),
    staleTime: 60 * 1000,
    retry: 3,
})

const useQuestion = () => useQuery<Question[]>({
    queryKey: ['questions'],
    queryFn: () => axios.get('/api/question').then((res) => res.data.data),
    staleTime: 60 * 1000,
    retry: 3,
})

const Page = () => {
  const { data: tags, error: tagError, isLoading: tagIsLoading } = useTag();
  const { data: questions, error: questionError, isLoading: questionIsLoading } = useQuestion();

  const isLoading = tagIsLoading || questionIsLoading;

  if (isLoading) {
    return (
    <div>
        <div className="tag">
            <ul>
                <li><Skeleton height={'2.5rem'} /></li>
            </ul>
        </div>
        <div className="question">
            <ul>
                <li><Skeleton height={'2.5rem'} /></li>
            </ul>
        </div>
    </div>
    )
  }

  if (tagError || questionError || !tags || !questions) return null;

  return (
    <div>
        <div className="tag">
            <ul>
                {
                    tags.map((tag, i) => (
                        <li key={i}>{tag.name}</li>
                    ))
                }
            </ul>
        </div>
        <div className="question">
            <ul>
                {
                    questions.map((question, i) => (
                        <li key={i}>{question.title}</li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default Page