import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './item.schema';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async findOne(id: string) {
    return this.itemModel.findById(id).exec();
  }

  async create(data: { name: string; description: string }): Promise<Item> {
    const newItem = new this.itemModel(data);
    return newItem.save();
  }

  async update(id: string, data: Partial<Item>) {
    return this.itemModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.itemModel.findByIdAndDelete(id).exec();
  }
}
