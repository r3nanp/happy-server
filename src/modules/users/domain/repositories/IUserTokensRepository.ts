import { IUserToken } from '../models/IUserToken'

type Response = IUserToken | undefined

export interface IUserTokenRepository {
  findByToken(token: string): Promise<Response>
  generate(user_id: string): Promise<IUserToken>
}
