import { inject, injectable } from 'tsyringe'
import { addHours, isAfter } from 'date-fns'
import { Service } from '@core/Service'
import { AppError } from '@errors/AppError'
import { BcryptAdapter } from '@infra/cryptography/BcryptAdapter'
import { IUser } from '../domain/models/IUser'
import { IUserToken } from '../domain/models/IUserToken'
import { IUserRepository } from '../domain/repositories/IUserRepository'
import { IUserTokenRepository } from '../domain/repositories/IUserTokensRepository'

type Request = Pick<IUser, 'password'> & Pick<IUserToken, 'token'>

@injectable()
export class ResetPasswordService implements Service<Request, void> {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('UserTokens')
    private userTokenRepository: IUserTokenRepository
  ) {}

  async execute({ token, password }: Request): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User token does not exists.')
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User does not exists.')
    }

    const tokenCreatedAt = userToken.created_at
    const compareTokenDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareTokenDate)) {
      throw new AppError('Token expired.')
    }

    const bcrypt = new BcryptAdapter(8)
    const hashedPassword = await bcrypt.hash(password)

    user.password = hashedPassword

    await this.usersRepository.save(user)
  }
}
