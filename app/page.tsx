'use client'

import { Button, Text, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "./validations/AuthValidation";
import { alert } from "./components/Toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Spinner from "./components/Spinner";
import Link from "next/link";
import Image from "next/image";
import Logo from '../public/logo.png'

type CredentialsLogin = z.infer<typeof loginSchema>;

export default function Home() {
  const { register, handleSubmit, formState: {errors} } = useForm<CredentialsLogin>({
    resolver: zodResolver(loginSchema)
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  const loginHandle = async (data: CredentialsLogin) => {
    setIsSubmitting(true)

    const response = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false
    })

    if (response?.error) {
      setIsSubmitting(false)
      alert('Invalid credentials', 'error')
    } else {
      setIsSubmitting(false)
      alert('Login successfully', 'success')
      router.push('/dashboard')
    }
  }

  return (
    <div className='login'>
      <div className='container mx-auto max-w-md h-screen flex flex-col justify-center'>
      <div className='loginborder p-5 bg-white border-gray-500 shadow-sm shadow-gray-500 rounded-lg'>
        <div className="flex justify-center my-5">
          <Image width={160} height={100} alt="logo" src={Logo} />
        </div>
        <form onSubmit={handleSubmit(loginHandle)}>
          <TextField.Root className="mb-3">
            <TextField.Input size={'3'} {...register('username')} name="username" type="text" placeholder="Username..." />
          </TextField.Root>
          <Text className="pb-3" color="red" as="p">{errors.username?.message}</Text>
          <TextField.Root className="mb-3">  
            <TextField.Input size={'3'} {...register('password')} name="password" type="password" placeholder="Password..." />
          </TextField.Root>
          <Text className="pb-3" color="red" as="p">{errors.password?.message}</Text>
          <p className="pb-3">Not registered? <Link className="text-blue-600" href={'/register'}>Register now</Link></p>
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
