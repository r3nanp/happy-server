import { IUser } from '../models/IUser'

type ICreateUser = Pick<IUser, 'password' | 'email'>

type Response = IUser | undefined

export interface IUserRepository {
  findByName(name: string): Promise<Response>
  findByEmail(email: string): Promise<Response>
  findById(id: string): Promise<Response>
  create(data: ICreateUser): Promise<IUser>
  save(user: IUser): Promise<IUser>
  findAll(): Promise<IUser[]>
}
