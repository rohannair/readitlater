export const hash = async (password: string): Promise<string> =>
  await Bun.password.hash(password, {
    algorithm: 'argon2id',
    memoryCost: 19456,
    timeCost: 2,
  })
