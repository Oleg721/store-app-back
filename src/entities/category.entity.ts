import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Product } from './product.entity';
import { CategoryAttribute } from './categoryAttribute.entity';

@Entity('Categories')
export class Category extends BaseEntity {
	@Column({
		unique: true,
	})
	name: string;

	@Column()
	description: string;

	@Column({
		nullable: true,
	})
	parentId: number;

	@ManyToOne(() => Category, (category) => category.children)
	parent: Category;

	@OneToMany(() => Category, (category) => category.parent)
	children: Category[];

	@OneToMany(() => Product, (product) => product.category)
	products: Product[];

	@OneToMany(
		() => CategoryAttribute,
		(categoryAttribute) => categoryAttribute.category
	)
	categoryAttributes: CategoryAttribute[];
}
