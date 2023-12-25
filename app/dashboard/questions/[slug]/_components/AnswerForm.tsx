'use client'

import { z } from 'zod'
import Spinner from '@/app/components/Spinner'
import { AddAnswerSchema } from '@/app/validations/AnswerValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import MDEditor from '@uiw/react-md-editor'
import axios from 'axios'
import { alert } from '@/app/components/Toast'
import { useRouter } from 'next/navigation'
import rehypeSanitize from "rehype-sanitize"

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
        <TextField.Root className='mb-5'>
            <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <MDEditor
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    preview="edit"
                    height={300}
                    fullscreen={false}
                    previewOptions={{
                      rehypePlugins: [[rehypeSanitize]],
                    }}
                  />
                )}
            />
        </TextField.Root>
        <Text color="red" className='pb-3' as="p">{errors.content?.message}</Text>
        <button type='submit' disabled={isSubmitting} className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}>
          Submit
          {isSubmitting && <Spinner />}
        </button> 
    </form>
  )
}

export default AnswerForm