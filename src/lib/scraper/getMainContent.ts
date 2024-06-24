import type * as cheerio from 'cheerio'

export function getMainContent($: cheerio.CheerioAPI) {
  $('script, style, nav, header, footer, .footer, #footer').remove()

  const mainContent =
    $('main').html() ||
    $('article').html() ||
    $('#content').html() ||
    $('.content').html() ||
    $('body').html()

  if (!mainContent) {
    throw new Error('No content found')
  }

  return mainContent.trim()
}
