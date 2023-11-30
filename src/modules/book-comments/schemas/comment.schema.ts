import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {

    @Prop({ required: true })
    public bookId: number;

    @Prop({ required: [true, 'Нипишите комментарий'] })
    public comment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);