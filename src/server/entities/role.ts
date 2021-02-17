import { Hero } from "./hero";
import { Field, ObjectType, ID } from "type-graphql";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Role {
    @Field((type) => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    role: string;
}