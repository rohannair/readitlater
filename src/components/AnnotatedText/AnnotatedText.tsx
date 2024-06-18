import React from 'react'
import {
  type AnnotatedText,
  type Mark,
  convertToAnnotated,
} from './convertToAnnotated'

interface AnnotatedBodyProps {
  body: string
  marks: Mark[]
}

const Segment = ({
  value,
  ref,
  callback = console.log,
}: AnnotatedText & { callback?: (ref: string) => void }) => {
  if (!ref) {
    return <>{value}</>
  }

  return (
    <mark
      className="bg-blue-300"
      onClick={() => callback(ref)}
      onKeyDown={() => callback(ref)}
    >
      {value}
    </mark>
  )
}

export const AnnotatedBody: React.FC<AnnotatedBodyProps> = ({
  body,
  marks,
}) => {
  const annotated = convertToAnnotated(body, marks)

  return (
    <>
      {annotated.map((segment) => {
        return segment.type === 'note' && segment.ref ? (
          <Segment key={segment.value} {...segment} />
        ) : (
          <React.Fragment key={segment.value}>{segment.value}</React.Fragment>
        )
      })}
    </>
  )
}
