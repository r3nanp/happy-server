import nodemailer, { Transporter } from 'nodemailer'
import { IParseMailTemplate, MailTemplate } from '@config/mailTemplate'
import { MailProvider } from '@core/adapters/models/MailProvider'

interface Message {
  from: {
    name: string
    email: string
  }
  to: string
  subject: string
  body: IParseMailTemplate
}

export class MailTrapProvider implements MailProvider {
  private transporter: Transporter
  private mailTemplate: MailTemplate

  constructor(mailConfig: object) {
    this.transporter = nodemailer.createTransport(mailConfig)
    this.mailTemplate = new MailTemplate()
  }

  async sendEmail(message: Message): Promise<void> {
    await this.transporter.sendMail({
      from: {
        name: message.from.name,
        address: message.from.email
      },
      to: message.to,
      subject: message.subject,
      html: await this.mailTemplate.parse(message.body)
    })
  }
}
