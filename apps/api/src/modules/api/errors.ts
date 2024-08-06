export class NotLoggedInError extends Error {
  readonly _tag = 'NotLoggedInError'
}

export class UnsupportedSiteError extends Error {
  readonly _tag = 'UnsupportedSiteError'
}

export class LinkCreationError extends Error {
  readonly _tag = 'LinkCreationError'
}
