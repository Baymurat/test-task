import { Comment, InputComment, SaveCommentReturnType, CommentsMap } from '../types/interfaces'
import { v4 as uuidv4 } from 'uuid'

const getRandomInRange = (from: number, to: number): number => {
  return Math.round(Math.random() * (to - from) + from)
}

const buildCommentsApi = (): SaveCommentReturnType => {
  const commentsString: string = localStorage.getItem('comments') ?? '[]'
  const comments: Comment[] = JSON.parse(commentsString)
  const allComments: CommentsMap = comments.reduce(function toMap (acc: CommentsMap, current) {
    const replies: CommentsMap = current.replies.reduce(toMap, {})
    acc[current.id] = current
    return { ...replies, ...acc }
  }, {})

  const saveComment = (newComment: Comment): Comment[] => {
    comments.push(newComment)
    localStorage.setItem('comments', JSON.stringify(comments))
    return comments
  }

  const replyComment = (replyTo: string, newComment: Comment): Comment[] => {
    allComments[replyTo].replies.push(newComment)
    allComments[newComment.id] = newComment
    localStorage.setItem('comments', JSON.stringify(comments))
    return comments
  }

  const getComments = (skip: number, count: number): Comment[] => {
    return comments.slice(skip, skip + count)
  }

  return [saveComment, replyComment, getComments]
}

const [saveComment, replyComment, getComments] = buildCommentsApi()

export const addComment = async (inputComment: InputComment): Promise<boolean> => {
  return await new Promise((resolve, reject) => {
    const randomTime = getRandomInRange(1000, 2000)
    const comment: Comment = {
      ...inputComment,
      id: uuidv4(),
      replies: []
    }

    setTimeout(() => {
      saveComment(comment)
      resolve(true)
    }, randomTime)
  })
}

export const replyToComment = async (replyTo: string, inputComment: InputComment): Promise<boolean> => {
  return await new Promise((resolve, reject) => {
    const randomTime = getRandomInRange(1000, 2000)
    const comment: Comment = {
      ...inputComment,
      id: uuidv4(),
      replies: []
    }
    setTimeout(() => {
      replyComment(replyTo, comment)
      resolve(true)
    }, randomTime)
  })
}

export const fetchComments = (skip: number, count: number): Comment[] => {
  return getComments(skip, count)
}
