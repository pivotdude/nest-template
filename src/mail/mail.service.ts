import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from './dto/SendEmail.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly prismaService: PrismaService,
  ) {}
  async sendEmail(sendEmailDto: SendEmailDto) {
    // this.prismaService.sentEmails;
    const statusMessageData = await this.mailerService.sendMail({
      to: sendEmailDto.email,
      subject: sendEmailDto.theme,
      template: sendEmailDto.template,
      context: sendEmailDto.context,
    });
    await this.prismaService.sentEmails.create({
      data: {
        id: statusMessageData.id,
        theme: sendEmailDto.theme,
        email: sendEmailDto.email,
        data: statusMessageData,
        context: sendEmailDto.context,
        template: sendEmailDto.template,
      },
    });
    return statusMessageData;
  }
}
