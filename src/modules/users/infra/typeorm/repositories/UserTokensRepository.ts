import { getRepository, Repository } from 'typeorm'
import { UserTokens } from '@modules/users/infra/typeorm/entities/users_tokens.entity'
import { IUserToken } from '@modules/users/domain/models/IUserToken'
import { IUserTokenRepository } from '@modules/users/domain/repositories/IUserTokensRepository'

type Response = IUserToken | undefined

export class UserTokensRepository implements IUserTokenRepository {
  private ormRepository: Repository<IUserToken>

  constructor() {
    this.ormRepository = getRepository(UserTokens)
  }

  async findByToken(token: string): Promise<Response> {
    const userToken = await this.ormRepository.findOne({
      where: {
        token
      }
    })

    return userToken
  }

  async generate(user_id: string): Promise<UserTokens> {
    const userToken = this.ormRepository.create({
      user_id
    })

    await this.ormRepository.save(userToken)

    return userToken
  }
}
