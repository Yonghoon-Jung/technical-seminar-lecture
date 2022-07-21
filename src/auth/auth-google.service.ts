import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleUserService {
  async googleSignIn(googleUser) {
    if (!googleUser) {
      return 'No user from google';
    }
    return {
      message: 'User information from google',
      user: googleUser,
    };
  }
}
