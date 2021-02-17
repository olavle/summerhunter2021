import { AuthChecker } from 'type-graphql';
import * as jwt from 'jsonwebtoken';

interface Context {
  token;
}

export const authChecker: AuthChecker<Context> = (
  { root, args, context, info },
  roles
) => {
  try {
    const tokenFromHeader = context.token;
    const decrypted: any = jwt.verify(tokenFromHeader, process.env.JWT_SECRET);

    if (roles.includes(decrypted.hero.role)) {
      console.log('Auth checker passes');
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};
