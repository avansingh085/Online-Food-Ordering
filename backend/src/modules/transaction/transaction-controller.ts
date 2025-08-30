import { Get, Post, Body, Controller, Param, Query, Put, Delete, BadRequestException } from "@nestjs/common"
import { TransactionService } from "./transaction-service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
@Controller('/users/transactions')
export class TransactionController {

    constructor(private readonly transactionService: TransactionService) { }

    @Post()
    async createTransaction(@Body() dto: Partial<CreateTransactionDto>) {
        return await this.transactionService.createTransaction(dto);

    }

    @Get()
    async getAllTransaction(@Query() dto: { page: number, limit: number }) {
        if (dto.page < 0 || dto.limit > 200) {
            return new BadRequestException('invalid page and limit ')
        }
        return await this.transactionService.getAllTransaction(dto);

    }

    @Put(':id')
    async updateTransaction(@Body() dto: Partial<CreateTransactionDto>, @Param('id') id: string) {
        return await this.transactionService.updateTransaction(id, dto);
    }

    @Get(":id")
    async getTransaction(@Param("id") id: string) {
        return await this.transactionService.getTransactionById(id);
    }
    @Delete(':id')
    async deleteTransaction(@Param('id') id: string) {

        return await this.transactionService.deleteTransaction(id);
    }
}