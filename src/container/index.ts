import { container } from 'tsyringe'

import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRepository'
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository'
import { IUserTokenRepository } from '@modules/users/domain/repositories/IUserTokensRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<IUserTokenRepository>(
  'UserTokensRepository',
  UserTokensRepository
)
