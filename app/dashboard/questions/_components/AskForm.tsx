  'use client'

  import Spinner from '@/app/components/Spinner'
  import { alert } from '@/app/components/Toast'
  import { QuestionSchema } from '@/app/validations/QuestionValidation'
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

  type QuestionFormData = z.infer<typeof QuestionSchema>

  const AskForm = () => {
    const router = useRouter()
    const { register, control, handleSubmit, formState: {errors} } = useForm<QuestionFormData>({
      resolver: zodResolver(QuestionSchema)
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [selectedTagId, setSelectedTagId] = useState<number | null>(null)

    const addQuestion = async (data: QuestionFormData) => {
      setIsSubmitting(true)

      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("description", data.description)
      formData.append('pic', data.pic[0])
      formData.append('tagId', String(selectedTagId)) 

      await axios.post('/api/question', formData).then(({data}) => {
        setIsSubmitting(false)
        alert(data.message, 'success')
        router.push('/dashboard')
      }).catch(({response}) => {  
        setIsSubmitting(false)
        alert(response.data.message, 'error')
      })
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      setImagePreview(file ? URL.createObjectURL(file) : null)
    }  

    const onTagSelect = (tagId: number | null) => {
      setSelectedTagId(tagId)
    }

    return (
      <form onSubmit={handleSubmit(addQuestion)} className='space-y-3' encType='multipart/form-data'>
        <TextField.Root>
          <TextField.Input size={'3'} {...register('title')} name="title" type="text" placeholder="Title..." />
        </TextField.Root>
        <Text color="red" as="p">{errors.title?.message}</Text>
        <TextField.Root >
          <Controller
            name="description"
            control={control}
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
            <TagSelect control={control} name="tagId" onTagSelect={onTagSelect} />
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
    )
  }


  export default AskForm

  