export async function fetchSite(url: string) {
  try {
    const resp = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    })

    if (!resp.ok) {
      throw new Error('Failed to fetch')
    }

    return await resp.text()
  } catch (e) {
    if (e instanceof Error) {
      throw e
    }
    throw new Error('Failed to fetch')
  }
}
