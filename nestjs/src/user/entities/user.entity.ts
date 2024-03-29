import { Posts } from 'src/post/entities/post.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  MaNV:string

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email:string;

  @Column()
  password:string;

  @Column()
  phone:string

  @Column({nullable:true ,default:null})
  refresh_token: string;

  @Column({ default: 1 })
  status: number;

  @Column({default:'User'})
  roles:string;

  @Column({nullable:true ,default:null})
  avatar:string;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;
  
  @DeleteDateColumn()
  deleted_at?:Date;
  
  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @OneToMany(() => Posts,(post)=> post.user)
  posts: Posts

}