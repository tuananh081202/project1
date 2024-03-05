import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from 'src/Category/entities/category.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { PaymentCart } from 'src/PaymentCart/entities/paymentcart.entity';
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column({ type: 'int', default: 1 })
    status: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => Category, (category) => category.product,
        {
            onDelete: "CASCADE"
        })
    category: Category;

    @OneToMany(() => Rating, (rating) => rating.product)
    ratings: Rating;

    @OneToMany(() => Cart, (cart) => cart.product)
    cart: Cart;

    @OneToMany(() => PaymentCart, (paymentcart) => paymentcart.product)
    paymentcart: PaymentCart;


}



