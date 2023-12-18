'use client'

import { alert } from '@/app/components/Toast'
import { AddCommenSchema } from '@/app/validations/CommentValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertDialog, Button, Flex, TextArea } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type AddCommentFormData = z.infer<typeof AddCommenSchema>
interface Answer {
    questionId: number
    answerId: number
}

const AnswersCommentsForm = ({ questionId, answerId }: Answer) => {
  const router = useRouter()
  const { register, handleSubmit, reset } = useForm<AddCommentFormData>({
    resolver: zodResolver(AddCommenSchema),
    defaultValues: {
        questionId: questionId,
        answerId: answerId
    }
  })
  const addComment = async (data: AddCommentFormData) => {
    await axios.post('/api/comments', data)
      .then(({data}) => {
        reset()
        alert(data.message, 'success')
        router.refresh()
    }).catch(({response}) => {  
        alert(response.data.message, 'error')
    })
  }
     
  return (
    <AlertDialog.Root>
        <AlertDialog.Trigger className='mt-5'>
            <button className='add-comment bg-transparent'><small className='text-gray-400'>Add a comment</small></button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
            <AlertDialog.Title>Write your comment</AlertDialog.Title>
            <form onSubmit={handleSubmit(addComment)}>
                <AlertDialog.Description size="2">
                    <input type="hidden" {...register('questionId')} name="questionId" value={questionId}/>
                    <input type="hidden" {...register('answerId')} name="answerId" value={answerId}/>
                    <TextArea {...register('content')} name='content' placeholder="Your comment…" />
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                        Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button type='submit' variant="solid" color="blue">
                        Submit
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </form>
        </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default AnswersCommentsForm