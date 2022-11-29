export interface InputComment {
  name: string
  email: string
  text: string
}

export interface Comment extends InputComment {
  id: string
  replies: Comment[]
}

export type CommentApiBuildReturnType = [
  (newComment: Comment) => Comment[],
  (replyTo: string, newComment: Comment) => Comment[],
  (skip: number, count: number) => CommentsResponse
]

export interface CommentsMap { [key: string]: Comment }

export interface Response<T> {
  data: T
}

export interface CommentsResponse extends Response<Comment[]> {
  count: number
}
