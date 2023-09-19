import { SetMetadata } from '@nestjs/common';
import { CorsMiddleware } from 'src/cors.middleware';

import { RolesT } from '../Models';

export const Roles = (...roles: RolesT[]) => SetMetadata('roles', roles);
