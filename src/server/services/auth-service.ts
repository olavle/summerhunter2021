import * as jwt from 'jsonwebtoken';
import { Hero } from '../entities/hero';

// const JWT_SIGNING_SECRET = 'this_secret_should_come_from_hidden_env_files_and_never_committed_to_repo';
const JWT_SIGNING_SECRET = process.env.JWT_SECRET;

const generateJwtForUserId = (userId: string) => jwt.sign({ userId }, JWT_SIGNING_SECRET);
const generateJwtForHero = (hero: any) => jwt.sign({ hero }, JWT_SIGNING_SECRET);
const generateJwtForRole = (role: string) => jwt.sign({ role }, JWT_SIGNING_SECRET)

export const AuthService = () => ({
	generateJwtForUserId,
	generateJwtForHero,
	generateJwtForRole
});
