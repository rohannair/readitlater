import s from 'sanitize-html'

export const sanitizeHtml = (html: string) => {
  return s(html, {
    allowedTags: s.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src', 'alt'],
    },
  })
}
