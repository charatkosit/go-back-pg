/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Pagination } from 'src/interfaces/Pagination';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductInfoDTO } from './dto/ProductInfo.dto';
import { ProductBulkInfoDTO } from './dto/ProductBulkInfo.dto';

// @UseGuards(JwtAuthGuard)
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

  @Get('pagination')
  async findAllWithPagination(@Query() query:Pagination){

    console.log(query)
    let code:number;
    let message:string;
    let counter = 100;
  
  
    
    const result = await this.productsService.findAllWithPagination(query.page, query.page_size, query.Brand, query.ItemName, query.ItemCode, query.Model)
    const total = await this.productsService.total(query.Brand, query.ItemName, query.ItemCode, query.Model)
    
   console.log(total[0].total)
   counter= total[0].total

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
      data: result
    } 
  }


  @Get('bill')
  getBill(){
    // return "bill return"
    return this.productsService.getBillTo();
  } 

  @Get('total')
  async getTotal(@Query() query:any){
   
   return await this.productsService.total(query.Brand, query.ItemName, query.ItemCode, query.Model)
 
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

  @Post('/update')
  async updateOne(@Body() productInfoDTO: ProductInfoDTO) {
    return await this.productsService.updateOneProduct(productInfoDTO);
  }

  @Post('/updatebulk')
  async updateBulk(@Body() productBulkInfoDTO: ProductBulkInfoDTO[]) {
    //นำข้อมูลที่ได้มาวน loop แล้วเรียกใช้ function updateOneProduct ทีละ record
    for (let i = 0; i < productBulkInfoDTO.length; i++) {
      await this.productsService.updateOneProduct(productBulkInfoDTO[i]);
    }
    return `Update ${productBulkInfoDTO.length} records successfully`;
   
  }
}
