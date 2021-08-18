import { inject, injectable } from 'tsyringe'
import { Service } from '@core/Service'
import { AppError } from '@errors/AppError'
import { BcryptAdapter } from '@infra/cryptography/BcryptAdapter'
import { IUser } from '../domain/models/IUser'
import { IUserRepository } from '../domain/repositories/IUserRepository'

type Request = Pick<IUser, 'email' | 'password'>

type Response = IUser

@injectable()
export class CreateUserService implements Service<Request, Response> {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {}


  async execute({ email, password }: Request): Promise<Response> {
    const emailExists = await this.usersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('A user with this email already exists.')
    }

    const bcrypt = new BcryptAdapter(8)
    const hashedPassword = await bcrypt.hash(password)

    const user = await this.usersRepository.create({
      email,
      password: hashedPassword
    })

    await this.usersRepository.save(user)

    return user
  }
}
