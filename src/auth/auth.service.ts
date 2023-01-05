import { User } from './../users/user.model';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private usersSevice: UsersService, private jwtService: JwtService) {}
        /** login action */
        async login(dto: CreateUserDto) {
            return this.generateToken(await this.validateUser(dto));
        }

        async registration(dto: CreateUserDto) {
            /** try to found input and check if email already in */
            const candidate = await this.usersSevice.getUserByEmail(dto.email);
            if (candidate) {
                throw new HttpException('This email already in', HttpStatus.BAD_REQUEST)
            } else {
                /** if not, hash password and registry a new */
                const hashPassword: string = await bcrypt.hash(dto.password, 5);
                return this.generateToken(await this.usersSevice.createUser({ ...dto, password: hashPassword }));
            }
        }

        private async generateToken(user: User) {
            const payload = { email: user.email, id: user.id, roles: user.roles };
            return { 
            /** token generation */
                token: this.jwtService.sign(payload)
            }
        }

        private async validateUser(dto: CreateUserDto) {
            /** comparing input password with user DB pass */
            const userAreIn = await bcrypt.compare(dto.password, (await this.usersSevice.getUserByEmail(dto.email)).password);
                if (userAreIn) {
                    /** if ok login */
                    return this.usersSevice.getUserByEmail(dto.email);
                }
                throw new UnauthorizedException({ message: 'bad email/password'});
            }
}
