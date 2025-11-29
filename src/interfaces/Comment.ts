export interface ResponseComment {
  commentId: number;
  writerName: string;
  content: string;
}

export interface ResponseCommentList {
  commentList: ResponseComment[];
}

export interface RequestComment {
  content: string;
}

