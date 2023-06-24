/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
 constructor(
  @InjectRepository(Order) 
  private ordersRepository: Repository<Order>
 ){}

  async create(createOrderDto: CreateOrderDto) :Promise<Order>{
    const order = new Order();
    order.cus_id = createOrderDto.cus_id;
    order.bill_to= createOrderDto.bill_to;
    order.sum_amountRTP = createOrderDto.sum_amountRTP;
    order.sum_amountSale = createOrderDto.sum_amountSale;
    order.sum_discount = createOrderDto.sum_discount
    order.total = createOrderDto.total;
    order.vat = createOrderDto.vat;
    order.grand_total = createOrderDto.grand_total;
    order.credit = createOrderDto.credit;
    order.ship_to = createOrderDto.ship_to;
    order.transportation = createOrderDto.transportation;
    order.date_time = createOrderDto.date_time

    return await this.ordersRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    const data = await this.ordersRepository.find({ order: { order_id: 'DESC'}})
    if(!data) {
      throw new NotFoundException('ไม่พบคำที่ค้นหา')
    }
    return data;
  }

  async findOne(id: number) {
   const data = await this.ordersRepository.findOne({ where: { order_id: id } })
    if (!data) {
      throw new NotFoundException('ไม่พบคำที่ค้นหา');
    }
    return data;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
