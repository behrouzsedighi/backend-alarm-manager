import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


  encryptAES256(data: string) {
    const encryptionKey = process.env.AES256KEY; // از 256 بیت (32 کاراکتر) برای AES-256 استفاده کنید
    const iv = randomBytes(16); // بردار مقدار اولیه (Initialization Vector) را بسازید
    const cipher = createCipheriv(
      'aes-256-cbc',
      Buffer.from(encryptionKey),
      iv,
    );

    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return {
      data: encryptedData,
      iv: iv.toString('hex'),
    };
  }

  decryptAES256(data: string, iv: string) {
    const ivBuffer = Buffer.from(iv, 'hex');
    const decipher = createDecipheriv(
      'aes-256-cbc',
      Buffer.from(process.env.AES256KEY),
      ivBuffer,
    );
    let decryptedData = decipher.update(data, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
  }



}
