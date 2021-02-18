import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, ID, Field, Authorized } from 'type-graphql';

@Entity()
@ObjectType()
export class Vault {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  //☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*
  @Authorized(['SUPERHERO', 'MEGAHERO'])
  @Field()
  @Column()
  treasures: string;
}
