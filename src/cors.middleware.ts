import { NestMiddleware } from '@nestjs/common';

export class CorsMiddleware {
  resolve(): any {
    return (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
      );
      if (req.method === 'OPTIONS') {
        res.header(
          'Access-Control-Allow-Methods',
          'GET, PUT, POST, DELETE, PATCH',
        );
        res.sendStatus(200);
      } else {
        next();
      }
    };
  }
}
