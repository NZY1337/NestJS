import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    Param,
    Query,
    Delete,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';

// we can also use the Serialize decorator at the controller level, 
// so that all the routes in this controller will be serialized using the UserDto class  
@Serialize(UserDto)
@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.usersService.create(body.email, body.password);
    }

    // request id comes as string always, so we need to parse it to a number
    // this will serialize the response using the UserDto class, so only the properties decorated with @Expose() in the UserDto class will be included in the response
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(parseInt(id));

        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }
}
