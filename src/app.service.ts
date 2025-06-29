import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    return 'All good!';
  }

  getHello(): string {
    return 'RHP Backend API';
  }
}
