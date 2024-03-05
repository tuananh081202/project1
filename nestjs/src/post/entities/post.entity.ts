import { Category } from "src/Category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    thumbnail: string

    @Column({type:'int',default:1})
    status: number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @DeleteDateColumn()
    deleted_at:Date

    @ManyToOne(() => User,(user) => user.posts,{
        onDelete:'CASCADE'
    })
    user: User

    @ManyToOne(() => Category,(category) => category.posts,{
        onDelete:'CASCADE'
    })
    category: Category

}