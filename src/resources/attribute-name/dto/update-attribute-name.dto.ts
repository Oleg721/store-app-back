import { PartialType } from '@nestjs/swagger';
import { CreateAttributeNameDto } from './create-attribute-name.dto';

export class UpdateAttributeNameDto extends PartialType(
	CreateAttributeNameDto
) {
	// extends 'type' or 'name' prop, partially
}
