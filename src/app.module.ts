import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './resources/user/users.module';
import { ProductModule } from './resources/product/product.module';
import { CategoryModule } from './resources/category/category.module';
import { AttributeNameModule } from './resources/attribute-name/attribute-name.module';
import { CategoryAttributeModule } from './resources/category-attribute/category-attribute.module';
import { ProductAttributeNameModule } from './resources/product-attribute-name/product-attribute-name.module';
import { WarehouseModule } from './resources/warehouse/warehouse.module';
import { WarehouseStockModule } from './resources/warehouse-stock/warehouse-stock.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			ignoreEnvFile: false,
			isGlobal: true,
			load: [configuration],
		}),
		UsersModule,
		AuthModule,
		ProductModule,
		CategoryModule,
		AttributeNameModule,
		CategoryAttributeModule,
		ProductAttributeNameModule,
		WarehouseModule,
		WarehouseStockModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
