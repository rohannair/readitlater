import TurndownService from 'turndown'

export function toMarkdown(html: string): string {
  return new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '*',
  })
    .addRule('lineBreaks', {
      filter: ['br'],
      replacement: () => '\n',
    })
    .turndown(html.trim())
}
