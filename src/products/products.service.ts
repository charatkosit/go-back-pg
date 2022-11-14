/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = new Product();
    // product.Brand= createProductDto.Brand;

    return 'This action adds a new product';
  }

  async findAll() {
    // const sql = 'select * from product where ItemName like "%สายพาน%"';
    // return await this.productsRepository.query(sql);
    return await 'find all' ;
  }

  async findBySearch(var1: string) :Promise<any[]> {
    const sql = `select * from product where ItemName like "%${var1}%" `;
    return  await this.productsRepository.query(sql);
 


   
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
