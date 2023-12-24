import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { CategoryModule } from './category/category.module';
import { CategoryController } from './category/category.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    ProfileModule,
    CategoryModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [CategoryController, AppController],
  providers: [AppService],
})
export class AppModule {}
