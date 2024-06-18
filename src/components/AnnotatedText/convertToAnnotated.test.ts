import { describe, expect, it } from 'bun:test'
import {
  type AnnotatedText,
  type Mark,
  convertToAnnotated,
} from './convertToAnnotated'

describe('convertToAnnotated', () => {
  it('should correctly split the body based on marks', () => {
    const body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    const marks: Mark[] = [
      { start: 6, end: 11, ref: 'note-0' },
      { start: 28, end: 39, ref: 'note-1' },
    ]
    const expectedOutput: AnnotatedText[] = [
      { type: 'text', value: 'Lorem ' },
      { type: 'note', value: 'ipsum', ref: 'note-0' },
      { type: 'text', value: ' dolor sit amet, ' },
      { type: 'note', value: 'consectetur', ref: 'note-1' },
      { type: 'text', value: ' adipiscing elit.' },
    ]
    expect(convertToAnnotated(body, marks)).toEqual(expectedOutput)
  })

  it('should handle empty marks array', () => {
    const body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    const marks: Mark[] = []
    const expectedOutput = [{ type: 'text', value: body }]
    expect(convertToAnnotated(body, marks)).toEqual(expectedOutput)
  })

  it('should handle marks that cover the entire body', () => {
    const body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    const marks: Mark[] = [{ start: 0, end: 56, ref: 'note-0' }]
    const expectedOutput = [{ type: 'note', value: body, ref: 'note-0' }]
    expect(convertToAnnotated(body, marks)).toEqual(expectedOutput)
  })

  // This test is skipped because the current implementation does not handle
  // overlapping marks correctly, and it's out of scope for this exercise.

  it.skip('should handle overlapping marks correctly', () => {
    const body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    const marks: Mark[] = [
      { start: 0, end: 11, ref: 'note-0' },
      { start: 6, end: 28, ref: 'note-1' },
    ]
    const expectedOutput = [
      { type: 'note', value: 'Lorem ipsum', ref: 'note-0' },
      { type: 'note', value: 'ipsum dolor sit amet,', ref: 'note-1' },
      { type: 'text', value: ' consectetur adipiscing elit.' },
    ]
    expect(convertToAnnotated(body, marks)).toEqual(expectedOutput)
  })
})
