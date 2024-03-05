import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/Products/entities/product.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: string;

  @Column({type:'longtext'})
  comment: string;

  @Column({type:'int',default:1})
  status:number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.ratings,
  {
    onDelete:'CASCADE'
  })
  user: User;

  @ManyToOne(() => Product, (product) => product.ratings,
  {
    onDelete:'CASCADE'
  })
  product: Product;
}
