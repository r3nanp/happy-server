import { Encrypter } from '@core/cryptography/Encrypter'
import { Decrypter } from '@core/cryptography/Decrypter'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(expiresIn: string, subject: string): Promise<string> {
    return jwt.sign({}, this.secret, {
      subject,
      expiresIn
    })
  }

  // Make agnostic
  async decrypt(ciphertext: string): Promise<string | object> {
    return jwt.verify(ciphertext, this.secret)
  }
}
