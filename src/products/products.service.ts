import { Inject, Injectable } from "@nestjs/common";
import { Products } from "./product.model";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductsService {
  constructor(
    @Inject("PRODUCTS_REPOSITORY")
    private productsRepository: typeof Products
  ) {}

  async create(createProductDto: CreateProductDto): Promise<object> {
    try {
      const product = await this.productsRepository.create(createProductDto);

      return product;
    } catch (error) {
      console.log(error);
    }
  }
}
