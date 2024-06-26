import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BaseCrudService } from 'src/common/services/baseCrud.service';
import { Category, CategoryAttribute } from 'src/entities';
import { Repository, In } from 'typeorm';
import { AttributeNameService } from '../attribute-name/attribute-name.service';
import { CategoryAttributeService } from '../category-attribute/category-attribute.service';
import { ProductAttributeNameService } from '../product-attribute-name/product-attribute-name.service';
import { ProductAttributeValuesViewDto } from '../product-attribute-name/dto/view-product-attribute-values.dto';

@Injectable()
export class CategoryService extends BaseCrudService<
	Category,
	UpdateCategoryDto,
	CreateCategoryDto
> {
	constructor(
		@Inject(Category)
		private categoryRepository: Repository<Category>,
		private readonly attributeNameService: AttributeNameService,
		@Inject(forwardRef(() => CategoryAttributeService))
		private readonly categoryAttributeService: CategoryAttributeService,
		private readonly productAttributeNameService: ProductAttributeNameService
	) {
		super(categoryRepository);
	}

	override async create(
		createDto: CreateCategoryDto
	): Promise<CreateCategoryDto & Category> {
		const { attributeNameIds, ...createCategoryDto } = createDto;

		const isNameExist = await this.categoryRepository.existsBy({
			name: createCategoryDto.name,
		});

		if (isNameExist) {
			return null;
		}

		const category = await super.create(createCategoryDto);

		if (!attributeNameIds?.length) {
			return category;
		}

		const [attributesNames] = await this.attributeNameService.findAll({
			where: { id: In(attributeNameIds) },
		});

		const categoryAttributes = attributesNames.map<CategoryAttribute>((an) => {
			const categoryAttribute = new CategoryAttribute();
			categoryAttribute.category = category;
			categoryAttribute.attributeName = an;
			return categoryAttribute;
		});

		await this.categoryAttributeService.createMany(categoryAttributes);

		const categoryWithRelations = this.categoryRepository.findOne({
			where: { id: category.id },
			relations: {
				categoryAttributes: {
					attributeName: true,
				},
			},
		});

		return categoryWithRelations;
	}

	getAttributesWithValuesByCategory(
		id: number
	): Promise<ProductAttributeValuesViewDto[]> {
		return this.productAttributeNameService.getAggregatedProductAttributesByCategory(
			id
		);
	}
}
