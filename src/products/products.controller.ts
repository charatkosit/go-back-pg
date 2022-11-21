/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller({
  version : '1',
  path: 'products'
}
  )
export class ProductsController {


  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }


  
  @Get('search')
  async findBySearch(@Query() query: any) {
    const data = await this.productsService.findBySearch(query.ItemName,query.ItemCode,query.Brand,query.Model,);
   

    const counter:number = Object.keys(data).length

    let code:number;
    
    let message:string;


    console.log (counter);
    if (counter == 0) {
        code =HttpStatus.NOT_FOUND;
        message='Not Found';  
    }else {
        code =HttpStatus.OK;
        message='OK';
    }
    
    return {
      code: code,
      message: message,
      resultFound: counter,
      data: data
    } 
        
  }



  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
