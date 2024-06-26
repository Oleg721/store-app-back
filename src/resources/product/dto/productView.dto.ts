import { ProductStatus } from 'src/entities/product.entity';
import { CreateViewDto } from 'src/resources/category/dto/view-category.dto';

export class ProductViewDto {
	id: number;

	name: string;

	description: string;

	status: ProductStatus;

	price: number;

	createdat: Date;

	categoryId: number;

	productAttributeNames?: { [key: string]: string | number | Date };

	category: Omit<
		CreateViewDto,
		'children' | 'products' | 'categoryAttributes' | 'parent'
	>;
}
