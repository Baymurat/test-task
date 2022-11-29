export interface InputComment {
  name: string
  email: string
  comment: string
}

export interface Comment extends InputComment {
  id: string
  replies: Comment[]
}

export type SaveCommentReturnType = [
  (newComment: Comment) => Comment[],
  (replyTo: string, newComment: Comment) => Comment[],
  (skip: number, count: number) => Comment[]
]

export interface CommentsMap { [key: string]: Comment }
