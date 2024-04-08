import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/Users.schema';
import { Model } from 'mongoose';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { JwtService } from '@nestjs/jwt';
import { PhoneAndPasswordDTO } from './dto/phoneAndPassword.dto';
import * as bcrypt from 'bcrypt';
import { AppService } from 'src/app.service';


@Injectable()
export class UsersService {

  constructor(@InjectModel(Users.name) private readonly usersModel: Model<Users>,
    private readonly i18n: I18nService,
    private jwtService: JwtService,
    private readonly appService: AppService
  ) { }

  async login(phoneAndPasswordDTO: PhoneAndPasswordDTO) {
    const findUser = await this.findUserByPhone(phoneAndPasswordDTO.phone);
    if (!findUser) {
      throw new BadRequestException(
        this.i18n.t('t.EMPTY_PHONE', {
          lang: I18nContext.current().lang,
        }),
      );
    }


    if ((await bcrypt.compare(phoneAndPasswordDTO?.password, findUser?.password)) !== true) {
      throw new BadRequestException(
        this.i18n.t('t.VALIDATE_LOGIN', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    return {
      status: 'success',
      message: this.i18n.t('t.LOGIN_SUCCESS', {
        lang: I18nContext.current().lang,
      }),
      token: await this.createToken(findUser),
    };
  }


  async register(phoneAndPasswordDTO: PhoneAndPasswordDTO) {
    const findUser = await this.findUserByPhone(phoneAndPasswordDTO.phone);
    if (findUser) {
      throw new BadRequestException(
        this.i18n.t('t.PHONE_EXIST', {
          lang: I18nContext.current().lang,
        }),
      );
    }
    return await this.usersModel.create({
      phone: phoneAndPasswordDTO.phone,
      password: await bcrypt.hash(phoneAndPasswordDTO?.password, 10),
    })
  }
  // global components
  async findUserById(id: string) {
    return await this.usersModel.findOne({ _id: id });
  }


  async findUserByPhone(phone: string) {
    return await this.usersModel.findOne({ phone: phone });
  }


  async createToken(user: {}) {
    return await this.jwtService.signAsync(this.appService.encryptAES256(JSON.stringify(user)));
  }

}
