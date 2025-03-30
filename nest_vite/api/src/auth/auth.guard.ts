import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
interface AuthenticatedRequest extends Request {
  user: { userId: string };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('-----');
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('No token provided');
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      req.user = this.jwtService.verify(token);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
