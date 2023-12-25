import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import React from 'react'
import { AiFillDelete } from 'react-icons/ai'

const DeleteButton = ({ onDelete }: {onDelete: () => void}) => {
  return (
    <AlertDialog.Root>
        <AlertDialog.Trigger>
            <Button variant='solid' color="red"><AiFillDelete /></Button>
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
                <Button onClick={onDelete} variant="solid" color="red">
                Delete
                </Button>
            </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>

  )
}

export default DeleteButton