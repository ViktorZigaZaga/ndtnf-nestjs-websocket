import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentValid } from './interfaces/comment.dto.validate'

@Injectable()
export class CommentsService {
    constructor(        
        @InjectModel(Comment.name)
        private CommentModel: Model<CommentDocument>,
    ) {}

    async createComment(data: CreateCommentValid): Promise<CommentDocument> {
        const comment = new this.CommentModel(data);
        try {
            await comment.save();
        } catch (e) {
            console.error(e);
        }
        return comment;
    }

    async findAllComments(bookId: number): Promise<CommentDocument[]> {
        try {
            return await this.CommentModel.find({ bookId }).select('-__v').exec();
        } catch(e) {
            console.error(e);
            return [];
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            this.CommentModel.findByIdAndRemove({ _id: id })
            return true;
        } catch(e) {
            console.error(e);
            return false;
        }
    }
}
