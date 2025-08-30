import { Inject, Injectable, } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Transaction, TransactionDocument } from "./transaction-schema";
import { CreateTransactionDto } from "./dto/create-transaction.dto";

@Injectable()
export class TransactionService {

    constructor(@InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>) { }

    async createTransaction(data: Partial<CreateTransactionDto>) {
        return await this.transactionModel.create(data);
    }

    async getTransactionById(id: string) {
        return await this.transactionModel.findById(id);
    }

    async getAllTransaction({ page, limit }) {
        const skip = (page - 1) * limit;
        const transactions = await this.transactionModel.find().skip(skip).limit(limit);
        const count = await this.transactionModel.countDocuments();
        return { transactions, count, page, limit };
    }

    async updateTransaction(id: string, data: Partial<CreateTransactionDto>) {

        return await this.transactionModel.findByIdAndUpdate(id, data, { new: true })

    }


    async deleteTransaction(id: string) {
        return await this.transactionModel.findByIdAndDelete(id);
    }
}