import { Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn,OneToMany } from "typeorm";
import { Product } from "src/Products/entities/product.entity";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    customerName: string

    @ManyToOne(() => Product, (product) => product.cart,
        {
            onDelete: 'CASCADE'
        })
    product: Product;
    
    @Column()
    image:string
    
    @Column()
    quantity:number 
    
    @Column()
    totalPrice: number

    @Column({type:'int',default:1})
    status: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    
}   