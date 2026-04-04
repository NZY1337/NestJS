import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user with id', this.id);
  }
}

/* 

import {
  DataSource,
  EntitySchema,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from "typeorm";

// 1) Plain class (no decorators)
export class User {
  id!: number;
  email!: string;
  password!: string;
}

// 2) Table/column mapping (instead of @Entity, @Column, @PrimaryGeneratedColumn)
export const UserSchema = new EntitySchema<User>({
  name: "User",
  target: User,
  tableName: "user",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
});

// 3) Lifecycle hooks (instead of @AfterInsert/@AfterUpdate/@AfterRemove)
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  afterInsert(event: InsertEvent<User>) {
    console.log("Inserted user with id", event.entity?.id);
  }

  afterUpdate(event: UpdateEvent<User>) {
    console.log("Updated user with id", event.entity?.id);
  }

  afterRemove(event: RemoveEvent<User>) {
    console.log("Removed user with id", event.entityId);
  }
}

// 4) Register schema + subscriber in DataSource
export const dataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  synchronize: true,
  entities: [UserSchema],
  subscribers: [UserSubscriber],
});

*/