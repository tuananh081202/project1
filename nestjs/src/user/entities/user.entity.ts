import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email:string;

  @Column()
  password:string;

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
  

}