import { Resolver, Query, ObjectType, Field, Arg } from 'type-graphql';
import { Service } from 'typedi';
import { Hero } from '../entities/hero';
import { AuthService } from '../services/auth-service';
import { HeroResolver } from './hero-resolver';

@ObjectType()
class AuthToken {
	@Field()
	jwt: string;
}

@Service()
@Resolver((of) => AuthToken)
export class AuthTokenResolver {
	constructor() {}

	@Query((returns) => AuthToken)
	authenticate(@Arg('userId') userId: string): AuthToken {
		
		return { jwt: AuthService().generateJwtForUserId(userId) };
	}

	// @Query((returns) => AuthToken)
	// authenticate(@Arg('hero') hero: any): AuthToken {
	// 	// return { jwt: AuthService().generateJwtForUserId(userId) };
	// 	return { jwt: AuthService().generateJwtForHero(hero) }
	// }

	// @Query((returns) => AuthToken)
	// authenticate(@Arg('role') role: string): AuthToken {
	// 	return { jwt: AuthService().generateJwtForRole(role) };
	// }
}
