import {
  Resolver,
  Query,
  Authorized,
  Arg,
  ObjectType,
  Field,
} from 'type-graphql';

import { Hero } from '../entities/hero';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { AuthService } from '../services/auth-service';

interface IHero {}
@ObjectType()
class AuthToken {
  @Field()
  jwt: string;
}

@Service()
@Resolver((of) => Hero)
export class HeroResolver {
  constructor(
    @InjectRepository(Hero) private readonly heroRepository: Repository<Hero>
  ) {}

  @Query((returns) => [Hero])
  heroes(): Promise<Hero[]> {
    return this.heroRepository.find();
  }

  //get by id
  @Query((returns) => AuthToken)
  secureHero(@Arg('id') id: string): Promise<AuthToken> {
    // const found = this.heroRepository.findOne(id)

    // return { jwt: AuthService().generateJwtForHero(found) }

    //new try
      // try {
      //   this.heroRepository.findOne(id).then((foundHero) => {
      //     console.log('In try block before return')
      //     return { jwt: AuthService().generateJwtForHero(foundHero) };
      //   });
      // } catch (error) {
      //   console.log('In catch block before return')
      //   // return { jwt: AuthService().generateJwtForUserId("1") };
      //   return null
      // }

    //anothre try HUOM AuthToken and returns AuthToken replaced by Promise<Hero> and returns hero
    // return this.heroRepository.findOne(id);


    const found = this.heroRepository.findOne(id).then(foundHero => {return { jwt: AuthService().generateJwtForHero(foundHero) }})
    return found

  }
}
