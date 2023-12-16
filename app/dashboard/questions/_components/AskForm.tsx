'use client'

import Spinner from '@/app/components/Spinner'
import { alert } from '@/app/components/Toast'
import { QuestionSchema, QuestionUpdateSchema } from '@/app/validations/QuestionValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextField } from '@radix-ui/themes'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, FieldError, useForm } from 'react-hook-form'
import { z } from 'zod'
import 'easymde/dist/easymde.min.css'
import SimpleMdeReact from 'react-simplemde-editor'
import TagSelect from './TagSelect'
import { Question } from '@prisma/client'
import { Tips, Info } from './Tips'

type QuestionFormData = z.infer<typeof QuestionSchema>
type QuestionUpdateFormData = z.infer<typeof QuestionUpdateSchema>

const AskForm = ({ question }: { question?: Question }) => {
  const router = useRouter()
  const { register, control, handleSubmit, formState: {errors} } = useForm<QuestionFormData | QuestionUpdateFormData>({
    resolver: zodResolver(question ? QuestionUpdateSchema : QuestionSchema)
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(question ? `/${question.pic}` : null)
  const [selectedTagId, setSelectedTagId] = useState<number | null>(question ? question.tagId : null)

  const QuestionForm = async (data: QuestionFormData | QuestionUpdateFormData) => {
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append('pic', data.pic[0] || undefined)
    formData.append('tagId', String(selectedTagId)) 
    
    const url = question ? `/api/question/${question.id}` : '/api/question'

    if (question) {
      await axios.put(url, formData)
      .then(({data}) => {
        setIsSubmitting(false)
        alert(data.message, 'success')
        if (selectedTagId !== data.data.tagId) {
          setSelectedTagId(data.data.tagId)
        }
        router.push('/dashboard/my-questions')
      }).catch(({response}) => {  
        setIsSubmitting(false)
        alert(response.data.message, 'error')
      })
    } else {
      await axios.post(url, formData)
      .then(({data}) => {
        setIsSubmitting(false)
        alert(data.message, 'success')
        router.push('/dashboard/my-questions')
      }).catch(({response}) => {  
        setIsSubmitting(false)
        alert(response.data.message, 'error')
      })
    }
  }

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setImagePreview(file ? URL.createObjectURL(file) : null)
  }  

  const onTagSelect = (tagId: number | null) => {
    setSelectedTagId(tagId)
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-6'>
        <div className="form col-span-1 md:col-span-2 lg:col-span-2">
          <h1 className='text-2xl mb-10'>Ask a public question</h1>
          <Tips />
          <form onSubmit={handleSubmit(QuestionForm)} className='space-y-3' encType='multipart/form-data'>
          <TextField.Root>
            <TextField.Input defaultValue={question?.title} size={'3'} {...register('title')} name="title" type="text" placeholder="Title..." />
          </TextField.Root>
          <Text color="red" as="p">{errors.title?.message}</Text>
          <TextField.Root >
            <Controller
                name="description"
                control={control}
                defaultValue={question?.description}
                render={({ field }) => (
                <SimpleMdeReact {...register('description')} placeholder="Description" {...field} />
                )}
            />
          </TextField.Root>
          <Text color="red" as="p">{errors.description?.message}</Text>
          <Controller
          control={control}
          name="tagId"
          render={({ field }) => (
              <TagSelect control={control} name="tagId" onTagSelect={onTagSelect} selectedTagId={selectedTagId}/>
          )}
              />
          <Text color="red" as="p">{errors.tagId?.message}</Text>
          {imagePreview && <Image alt='imgPreview' width={'150'} height={'150'} className='py-5' src={imagePreview} />} 
          <TextField.Root> 
            <input
            {...register('pic', { onChange: changeHandler })}
            type="file"
            name='pic'
            className="appearance-none border border-gray-300 p-2 w-full rounded-md"
            />
          </TextField.Root>
          <div>
          {errors.pic && typeof errors.pic === 'object' && 'message' in errors.pic && (
              <Text color="red" as="p">{(errors.pic as FieldError).message}</Text>
          )}
          </div>
          <Button highContrast disabled={isSubmitting} size={'3'} variant="solid">
            Submit
            {isSubmitting && <Spinner />}
          </Button>           
          </form> 
        </div>
        <Info />
    </div>        
  )
}


export default AskForm

