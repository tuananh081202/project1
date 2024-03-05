import { Body, Controller, Post, Query, Get, Param, Put, Delete, ParseArrayPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentcartService } from './paymentcart.service';
import { CreatePaymentCartDto } from './dto/create-paymentcart.dto';
import { PaymentCart } from './entities/paymentcart.entity';
import { FilterPaymentcartDto } from './dto/filter-paymentcart.dto';
import { UpdatePaymentcartDto } from './dto/update-paymentcart.dto';

@ApiTags('Payment')
@Controller('paymentcart')
export class PaymentcartController {
    constructor(private PaymentcartService: PaymentcartService) { }

    @Post('create')
    async create(@Body() createPaymentCartDto: CreatePaymentCartDto): Promise<PaymentCart> {
        return await this.PaymentcartService.create(createPaymentCartDto)
    }

    @Get()
    async findAll(@Query() query: FilterPaymentcartDto): Promise<any> {
        return await this.PaymentcartService.findAll(query)
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PaymentCart> {
        return await this.PaymentcartService.findOne(Number(id))
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() UpdatePaymentcartDto: UpdatePaymentcartDto) {
        return await this.PaymentcartService.update(Number(id), UpdatePaymentcartDto)
    }

    @Delete(':ids')
    async multipleDelete(@Query('ids', new ParseArrayPipe({ items: String, separator: ',' })) ids: string[]) {
        console.log('delete multi=>', ids);
        return this.PaymentcartService.multipleDelete(ids)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.PaymentcartService.delete(Number(id))
    }

    
}
