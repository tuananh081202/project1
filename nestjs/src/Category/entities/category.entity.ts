import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Product } from 'src/Products/entities/product.entity';
import { Post } from 'src/post/entities/post.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
    
    @OneToMany(() => Product, (product) => product.category)
    product: Product;

    @OneToMany(() => Post,(post)=> post.category)
    posts: Post
  
}