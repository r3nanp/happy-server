import { Repository, getRepository } from 'typeorm'
import { Users } from '../entities/user.entity'
import { IUser } from '@modules/users/domain/models/IUser'
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository'

type Response = IUser | undefined

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<IUser>

  constructor() {
    this.ormRepository = getRepository(Users)
  }

  async create({ email, password }: IUser): Promise<IUser> {
    const user = this.ormRepository.create({ email, password })

    await this.ormRepository.save(user)

    return user
  }

  async save(user: IUser): Promise<IUser> {
    await this.ormRepository.save(user)

    return user
  }

  async findAll(): Promise<IUser[]> {
    const user = await this.ormRepository.find()

    return user
  }

  async findByName(name: string): Promise<Response> {
    const user = await this.ormRepository.findOne({
      where: {
        name
      }
    })

    return user
  }

  async findByEmail(email: string): Promise<Response> {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    })

    return user
  }

  async findById(id: string): Promise<Response> {
    const user = await this.ormRepository.findOne({
      where: {
        id
      }
    })

    return user
  }
}
