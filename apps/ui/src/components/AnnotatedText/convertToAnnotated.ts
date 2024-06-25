export type Mark = { start: number; end: number; ref: string }
export type AnnotatedText = { type: string; value: string; ref?: string }

export function convertToAnnotated(
  body: string,
  marks: Mark[],
): AnnotatedText[] {
  const result: { type: string; value: string; ref?: string }[] = []
  let lastIndex = 0

  for (const mark of marks) {
    // Add the text before the current mark
    if (mark.start > lastIndex) {
      result.push({ type: 'text', value: body.slice(lastIndex, mark.start) })
    }
    // Add the marked text with its ref
    result.push({
      type: 'note',
      value: body.slice(mark.start, mark.end),
      ref: mark.ref,
    })
    lastIndex = mark.end
  }

  // Add the remaining text after the last mark
  if (lastIndex < body.length) {
    result.push({ type: 'text', value: body.slice(lastIndex) })
  }

  return result
}
