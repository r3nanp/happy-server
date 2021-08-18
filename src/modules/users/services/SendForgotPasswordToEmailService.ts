import path from 'path'
import { inject, injectable } from 'tsyringe'
import { mail } from '@config/mail'
import { Service } from '@core/Service'
import { AppError } from '@errors/AppError'
import { IUser } from '../domain/models/IUser'
import { IUserRepository } from '../domain/repositories/IUserRepository'
import { IUserTokenRepository } from '../domain/repositories/IUserTokensRepository'
import { MailTrapProvider } from '@core/adapters/implementations/mail/MailTrapProvider'

type Request = Pick<IUser, 'email'>


@injectable()
export class SendForgotPasswordEmailService implements Service<Request, void> {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('UserTokens')
    private userTokenRepository: IUserTokenRepository
  ) {}

  async execute({ email }: Request): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User not found.')
    }

    const { token } = await this.userTokenRepository.generate(user.id)

    const mailConfig = new MailTrapProvider(mail.drivers.mailtrap)

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    )

    await mailConfig.sendEmail({
      to: email,
      from: {
        name: 'Staff Happy',
        email: 'staff@happy.com'
      },
      subject: '[happy] Recuperação de senha',
      body: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.email,
          link: `${process.env.APP_URL}/reset_password?token=${token}`
        }
      }
    })
  }
}
