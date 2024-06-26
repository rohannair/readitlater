export const verify = async (
  password: string,
  hash: string,
): Promise<boolean> => await Bun.password.verify(password, hash)
