'use client'

import React from 'react'
import MDEditor from '@uiw/react-md-editor'

const MarkDown = ({ content }: {content: string}) => {
  return (
    <div className='markdown'>
        <MDEditor.Markdown source={content} style={{ whiteSpace: 'pre-wrap' }} />
    </div>
  )
}

export default MarkDown