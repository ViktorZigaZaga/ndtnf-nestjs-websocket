import { UseFilters } from '@nestjs/common'
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io'
import { WsExceptionFilter } from "./filters/ws.exception.filter";
import { CommentsService } from "./modules/book-comments/comments.service";
import { WsDtoValidationPipe } from "./validations/ws.dto.validation.pipe";
import { CreateCommentValid } from "./modules/book-comments/interfaces/comment.dto.validate";
import { IdValidationPipe } from './validations/id.validation.pipe';

@UseFilters(new WsExceptionFilter)
@WebSocketGateway({ cors: true })
export class AppGateway {
    constructor(
        private readonly commentService: CommentsService,
    ) {}

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('getAllComments')
    async getAllComments(@MessageBody('bookId', IdValidationPipe) bookId: number) {
        return await this.commentService.findAllComments(bookId);
    }

    @SubscribeMessage('addComment')
    async addComment(@MessageBody(WsDtoValidationPipe) createBookComment: CreateCommentValid) {
        return await this.commentService.createComment(createBookComment);
    }
}