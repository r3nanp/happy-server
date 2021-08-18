import { Request, Response } from 'express'
import * as yup from 'yup'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'
import { CreateUserService } from '@modules/users/services/CreateUserService'

export class CreateUserController {
  async create(request: Request, response: Response) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(7).required()
    })

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' })
    }

    await schema.validate(request.body, {
      abortEarly: false
    })

    const createUser = container.resolve(CreateUserService)

    const { email, password } = request.body

    const user = await createUser.execute({
      email,
      password
    })

    return response.status(201).json(classToClass(user))
  }
}
