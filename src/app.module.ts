import {
  MiddlewareConsumer,
  Module,
  NestModule,
  forwardRef,
} from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/role.model";
import { UserRole } from "./roles/user-role.model";
import { AuthModule } from "./auth/auth.module";
import { CategoriesModule } from "./categories/categories.module";
import { Categories } from "./categories/categories.model";
import { GetUserIdFromJwtMiddleware } from "./middlewares/get-id-from-jwt.middleware";
import { CategoriesController } from "./categories/categories.controller";
import { ProductsModule } from "./products/products.module";
import { Products } from "./products/product.model";
import { ProductsController } from "./products/products.controller";
import { FilesModule } from "./files/files.module";
import { RefreshModule } from "./refresh/refresh.module";
import { Refresh } from "./refresh/refresh.model";
import { StatisticsModule } from "./statistics/statistics.module";
import { UserStatistics } from "./statistics/statistics.model";
import { Helpers } from "./helpers/helpers";
import { ApisModule } from "./apis/apis.module";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          sslmode: true,
        },
      },
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      models: [
        User,
        Role,
        UserRole,
        Categories,
        Products,
        Refresh,
        UserStatistics,
      ],
      autoLoadModels: true,
    }),

    forwardRef(() => UsersModule),
    RolesModule,
    ClientsModule.register([
      {
        name: "MATH_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://localhost:5672"],
          queue: "cats_queue",
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    AuthModule,
    CategoriesModule,
    ProductsModule,
    FilesModule,
    RefreshModule,
    StatisticsModule,
    ApisModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GetUserIdFromJwtMiddleware)
      .forRoutes(CategoriesController, ProductsController);
    consumer.apply(GetUserIdFromJwtMiddleware).forRoutes("auth/logout");
  }
}
