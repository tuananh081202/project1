import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,ManyToOne } from "typeorm";
import { Product } from "src/Products/entities/product.entity";
@Entity()
export class PaymentCart {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    customerName:string

    
    @Column()
    paymentMethod:string

    @Column()
    totalPrice: number

    @Column({type:'int',default:1})
    status:number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @ManyToOne(() => Product, (product) => product.paymentcart,
        {
            onDelete: 'CASCADE'
        })
    product: Product;

}