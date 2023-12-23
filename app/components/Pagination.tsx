'use client'

import { Button, Flex } from '@radix-ui/themes'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'

interface Props {
    itemCount: number
    pageSize: number
    currentPage: number
}

const Pagination = ({ itemCount, pageSize }: Props) => {
  const router = useRouter()
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1
  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageCount <= 1) return null

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`)
    router.refresh()
  }
  return (
    <Flex align="center" gap="2">
      <p>Page {currentPage} of {pageCount}</p>
      <Button color="gray" variant="soft" disabled={currentPage === 1} onClick={() => changePage(1)}>
        <AiOutlineDoubleLeft />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
        <AiOutlineArrowLeft  />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}>
        <AiOutlineArrowRight />
      </Button>
      <Button
        color="gray" variant="soft" disabled={currentPage === pageCount} onClick={() => changePage(pageCount)}>
        <AiOutlineDoubleRight />
      </Button>
    </Flex>
  )
}

export default Pagination