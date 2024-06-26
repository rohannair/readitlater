export const hash = async (password: string): Promise<string> =>
  Bun.password.hash(password, { algorithm: 'argon2id' })
