import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import React from 'react'

interface CloseButtonProps {
    onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <AlertDialog.Root>
        <AlertDialog.Trigger>
            <Button variant='solid' color="blue">Close</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
            <AlertDialog.Title>Close question</AlertDialog.Title>
            <AlertDialog.Description size="2">
            Are you sure close this question?
            </AlertDialog.Description>
            <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                Cancel
                </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
                <Button onClick={onClick} variant="solid" color="blue">
                Close
                </Button>
            </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default CloseButton