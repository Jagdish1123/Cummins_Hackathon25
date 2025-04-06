import { connectToDatabase } from '@/lib/mongodb';
import { Transaction } from '@/models/Transaction';
import { Group as GroupModel } from '@/models/Group';
import { User } from '@/models/User';
import type { Group } from '@/types/group';
import type { User as UserType } from '@/types/user';
import type { Transaction as TransactionType } from '@/types/payment';

export const MongoDBService = {
  async getTransactions(userId?: string) {
    await connectToDatabase();
    const query = userId ? { user_id: userId } : {};
    return Transaction.find(query).sort({ created_at: -1 }) as Promise<TransactionType[]>;
  },

  async createTransaction(transactionData: Partial<TransactionType>) {
    await connectToDatabase();
    const transaction = new Transaction(transactionData);
    return transaction.save();
  },

  async getGroups(userId?: string) {
    await connectToDatabase();
    const query = userId ? { 'members.id': userId } : {};
    return GroupModel.find(query).sort({ created_at: -1 }) as Promise<Group[]>;
  },

  async createGroup(groupData: Partial<Group>) {
    await connectToDatabase();
    const group = new GroupModel(groupData);
    return group.save() as Promise<Group>;
  },

  async updateGroup(groupId: string, updateData: Partial<Group>) {
    await connectToDatabase();
    return GroupModel.findOneAndUpdate(
      { id: groupId },
      updateData,
      { new: true }
    ) as Promise<Group>;
  },

  async getUser(userId: string) {
    await connectToDatabase();
    return User.findOne({ id: userId }) as Promise<UserType>;
  },

  async updateUser(userId: string, updateData: Partial<UserType>) {
    await connectToDatabase();
    return User.findOneAndUpdate(
      { id: userId },
      updateData,
      { new: true }
    ) as Promise<UserType>;
  }
}; 