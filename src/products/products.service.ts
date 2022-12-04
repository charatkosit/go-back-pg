/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { myProduct } from '../interfaces/MyProduct'
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { AxiosRequestConfig } from 'src/interfaces/AxiosRequestConfig';

@Injectable()

export class ProductsService {



  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private httpService: HttpService
  ) { }


  async getBill() {
    // const url = environment.sapUrl;
    const url = 'http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json'

    const { data } = await firstValueFrom(this.httpService.get(url));

    return data
  }

  async getBillTo() {
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        token: 'z@hz3sNY#0ohB9SspeE9@fLDQ%r65x$k8LxL28VH72FfvRWgCn',
        data: { BillToCode: '10019590100-001' }
      },
    };

    const requestUrl = 'http://192.168.20.17:8880/apigoplus/GetBillTo/'
    const responseData = await lastValueFrom(
      this.httpService.post(requestUrl, null, requestConfig).pipe(
        map((response) => {
          return response.data;
        }),
      ),
    );
  }


  create(createProductDto: CreateProductDto) {
    const product = new Product();
    // product.Brand= createProductDto.Brand;

    return 'This action adds a new product';
  }

  async findAll() {
    // const sql = 'select * from product where ItemName like "%สายพาน%"';
    // return await this.productsRepository.query(sql);
    return await 'find all';
  }

  async findBySearch(ItemName: string, ItemCode: string, Brand: string, Model: string): Promise<any> {
    const sql = `select * from product where ItemName like "%${ItemName}%"
                    and ItemCode like "%${ItemCode}%"
                    and Brand like "%${Brand}%"
                    and Model like "%${Model}%"
                    limit 50 `;

    return await this.productsRepository.query(sql);
  }


  async findTotalBySearch(ItemName: string, ItemCode: string, Brand: string, Model: string): Promise<any> {
    const sql = `select count(*) as total where ItemName like "%${ItemName}%"
        and ItemCode like "%${ItemCode}%"
        and Brand like "%${Brand}%"
        and Model like "%${Model}%"`

    return await this.productsRepository.query(sql);
  }


  async findAllWithPagination(page: number = 1, page_size: number = 50, itemName: string, brand: string, model: string): Promise<any> {

    const result = await this.productsRepository.find({
      where: {
        ItemName: Like('%' + itemName + '%'),
        //  ItemCode: Like('%'+ itemCode+'%'),
        Model: Like('%' + model + '%'),
        Brand: Like('%' + brand + '%')
      },
      order: { id: 'ASC' },
      skip: (page - 1) * page_size,
      take: page_size,


    })
    return result

  }

  async total(itemName: string, brand: string, model: string): Promise<any> {
    const sql = `SELECT COUNT(*) AS total  from product where ItemName LIKE '%${itemName}%'
    AND Brand LIKE '%${brand}%'
    AND Model LIKE '%${model}%'`
    const total = await this.productsRepository.query(sql);

    return total
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
