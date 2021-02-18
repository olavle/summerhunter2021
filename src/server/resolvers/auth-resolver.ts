import { Resolver, Query, ObjectType, Field, Arg } from 'type-graphql';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Hero } from '../entities/hero';
import { AuthService } from '../services/auth-service';

@ObjectType()
class AuthToken {
  @Field()
  jwt: string;
}

@Service()
@Resolver((of) => AuthToken)
export class AuthTokenResolver {
  constructor(
    @InjectRepository(Hero) private readonly heroRepository: Repository<Hero>
  ) {}
  @Query((returns) => AuthToken)
  authenticate(@Arg('userId') userId: string): AuthToken {
    return { jwt: AuthService().generateJwtForUserId(userId) };
  }

  @Query((returns) => AuthToken)
  secureHero(@Arg('id') id: string): Promise<AuthToken> {
    const found = this.heroRepository.findOne(id).then((foundHero) => {
      return { jwt: AuthService().generateJwtForHero(foundHero) };
    });
    return found;
  }
}
