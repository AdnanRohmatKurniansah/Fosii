'use client'

import { z } from 'zod'
import Spinner from '@/app/components/Spinner'
import { AddAnswerSchema } from '@/app/validations/AnswerValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import SimpleMdeReact from 'react-simplemde-editor'
import axios from 'axios'
import { alert } from '@/app/components/Toast'
import { useRouter } from 'next/navigation'

type AddAnswerFormData = z.infer<typeof AddAnswerSchema>

const AnswerForm = ({ questionId }: {questionId: number}) => {
  const router = useRouter()
  const { register, control, handleSubmit, formState: {errors}, reset } = useForm<AddAnswerFormData>({
    resolver: zodResolver(AddAnswerSchema),
    defaultValues: {
        questionId: questionId
    }
  })
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  const AddAnswer = async (data: AddAnswerFormData) => {
    setIsSubmitting(true) 

    await axios.post('/api/answers', data)
      .then(({data}) => {
        setIsSubmitting(false)
        reset()
        alert(data.message, 'success')
        router.refresh()
    }).catch(({response}) => {  
        setIsSubmitting(false)
        alert(response.data.message, 'error')
    })
  }

  return (  
    <form onSubmit={handleSubmit(AddAnswer)}>
        <input type="hidden" {...register('questionId')} name="questionId" value={questionId}/>
        <TextField.Root>
            <Controller
                name="content"
                control={control}
                render={({ field }) => (
                <SimpleMdeReact  {...register('content')} placeholder="Your answer" {...field} />
                )}
            />
        </TextField.Root>
        <Text color="red" className='mb-3' as="p">{errors.content?.message}</Text>
        <Button type='submit' disabled={isSubmitting} size={'3'} variant="solid">
            Submit
            {isSubmitting && <Spinner />}
        </Button>   
    </form>
  )
}

export default AnswerForm