'use client'

import { Button, Text, TextField } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { alert } from "../components/Toast"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import Spinner from "../components/Spinner"
import { registerSchema } from "../validations/AuthValidation"
import axios from "axios"
import Link from "next/link"
import Image from "next/image"
import Logo from '../../public/logo.png'

type CredentialsRegister = z.infer<typeof registerSchema>

const Register = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<CredentialsRegister>({
    resolver: zodResolver(registerSchema)
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  const registerHandle = async (data: CredentialsRegister) => {
    setIsSubmitting(true)
  
    await axios.post('/api/auth/register', data).then(({data}) => {
      setIsSubmitting(false)
      alert(data.message, 'success')
      router.push('/')
    }).catch(({response}) => {
      setIsSubmitting(false)
      alert(response.data.message, 'error')
    })
  }
  

  return (
    <div className='login'>
      <div className='container px-5 md:mx-auto max-w-md h-screen flex flex-col justify-center'>
        <div className='loginborder p-5 bg-white border-gray-500 shadow-sm shadow-gray-500 rounded-lg'>
          <div className="flex justify-center my-5">
            <Image width={160} height={100} alt="logo" src={Logo} />
          </div>
          <form onSubmit={handleSubmit(registerHandle)}>
          <TextField.Root className="mb-3">
            <TextField.Input size={'3'} {...register('name')} name="name" type="text" placeholder="Name..." />
          </TextField.Root>
          <Text className="pb-3" color="red" as="p">{errors.name?.message}</Text>
          <TextField.Root className="mb-3">
            <TextField.Input size={'3'} {...register('username')} name="username" type="text" placeholder="Username..." />
          </TextField.Root>
          <Text className="pb-3" color="red" as="p">{errors.username?.message}</Text>
          <TextField.Root className="mb-3">  
            <TextField.Input size={'3'} {...register('password')} name="password" type="password" placeholder="Password..." />
          </TextField.Root>
          <Text className="pb-3" color="red" as="p">{errors.password?.message}</Text>
          <p className="pb-3">Already registered? <Link className="text-blue-600" href={'/'}>Login now</Link></p> 
          <Button highContrast disabled={isSubmitting} size={'3'} variant="solid">
            Submit
            {isSubmitting && <Spinner />}
          </Button>
          </form>
        </div>  
      </div>
    </div>
  )
}

export default Register
