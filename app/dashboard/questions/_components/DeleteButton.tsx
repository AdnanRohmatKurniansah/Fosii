import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import React from 'react'
import { AiFillDelete } from 'react-icons/ai'

const DeleteButton = ({ onDelete }: {onDelete: () => void}) => {
  return (
    <AlertDialog.Root>
        <AlertDialog.Trigger>
            <button className='bg-red-600 text-white font-bold py-2 px-3 rounded'>
                <AiFillDelete />
            </button> 
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
            <AlertDialog.Title>Delete question</AlertDialog.Title>
            <AlertDialog.Description size="2">
            Are you sure delete this question?
            </AlertDialog.Description>
            <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                Cancel
                </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
                <button onClick={onDelete} className='bg-red-600 text-white text-sm font-bold py-1 px-2 rounded'>
                   Delete
                </button> 
            </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>

  )
}

export default DeleteButton