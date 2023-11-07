import { Column, DataType, Table, Model } from 'sequelize-typescript';

interface UserCreationAttrs {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  salt: string;
  profile_picture: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  salt: string;

  @Column({
    type: DataType.STRING,
  })
  about: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  profile_picture: string;
}
