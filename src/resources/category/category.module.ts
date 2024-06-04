import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryMapperProvider } from './categoryMapper.provider';
import { CategoryAttributeService } from '../category-attribute/category-attribute.service';
import { ProductService } from '../product/product.service';
import { ProductMapperProvider } from '../product/productMapper.provider';
import { AttributeNameModule } from '../attribute-name/attribute-name.module';
import { ProductAttributeNameModule } from '../product-attribute-name/product-attribute-name.module';

@Module({
	imports: [DatabaseModule, AttributeNameModule, ProductAttributeNameModule],
	controllers: [CategoryController],
	providers: [
		CategoryService,
		CategoryMapperProvider,
		ProductMapperProvider,
		CategoryAttributeService,
		ProductService,
	],
})
export class CategoryModule {}
