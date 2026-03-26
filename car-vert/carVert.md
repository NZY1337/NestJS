<!-- users -->
# nest g controller users
# nest g module users  
# nest g service users
# create user.entity.ts manually

- inside user module import TypeOrmModule & User Entity
- inside appmodule import user entity and pass it down to TypeOrmModule entities

# instal sqlite extension

<!-- Difference between dtos and .entity -->

# User entity = how data looks in the database
# CreateUserDto = how incoming API data is validated

<!-- Typical flow: -->

- Client sends POST request with email and password
- Nest validates that body against CreateUserDto
- Service creates a User entity from that DTO
- TypeORM saves the entity to the database

# CLASS DEFINITION:
    @Entity()          // ← this function runs RIGHT NOW
    export class User {
        @Column()      // ← this function runs RIGHT NOW
        email: string;
    }

# INSTANCE TIME (runs later, every time you call new) 
    const user = new User();

# IMPORTANT 
- SAVE & REMOVE are expected to be called with entity instances (this.repo.create) 
- hooks will be executed (user.entity)
- if we use INSERT, UPDATE, DELETE directly, hooks will not be executed

# ############ #
# INTERCEPTORS #
# ############ #
- check interceptors screenhsot to understand why

- basically for some routes we want to exclude some properties (like user password)
  for admin, we can see extra props tied to the user
  for normal user, some props we might one to exclude

- one simple solution (in user.entity) 
    * import { Exclude } from 'class-transformer';
    * @Column()
      @Exclude()
      password: string;

    * on user controller
      import { ..., UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
    * and for findUser, use it like this

      @UseInterceptors(ClassSerializerInterceptor)\
      @Get('/:id')
      async findUser(...)

- but this is not scalable because we need to use the same user entity and we might have 2 different routes 
  and send different things. So if we exclude the user's password from the User Entity, both routes will not receive
  that prop [[[[x]]]]