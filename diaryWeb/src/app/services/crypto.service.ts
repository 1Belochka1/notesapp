import { Injectable } from '@angular/core'
import { AES, enc } from 'crypto-js'
import { environment } from '../../environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor() {}

  encryptData(data: string): string {
    const encryptKey = environment.encryptionKey;
    const encryptedData = AES.encrypt(data, encryptKey).toString();
    return encryptedData;
  }

  decryptData(encryptedData: string): string {
    const encryptKey = environment.encryptionKey;
    const decryptedData = AES.decrypt(encryptedData, encryptKey).toString(
      enc.Utf8
    );
    return decryptedData;
  }
}
