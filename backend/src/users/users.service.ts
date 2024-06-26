import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    async create(createUserDto: CreateUserDto) {
        const createUser = this.userModel.create(createUserDto);
        return createUser;
    }

    async delete(userId: string): Promise<User> {
        // TODO: Implement Soft delete
        const deletedUser = await this.userModel
            .findByIdAndDelete(userId)
            .exec();
        return deletedUser;
    }

    async findOne(userId: string): Promise<User> {
        return this.userModel.findById(userId).exec();
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email: email }).exec();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async update(userId: string, createUserDto: CreateUserDto): Promise<User> {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(userId, createUserDto, {
                new: true,
            })
            .exec();
        return updatedUser;
    }
}
