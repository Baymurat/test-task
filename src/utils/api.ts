import { Comment, CommentApiBuildReturnType, CommentsMap, CommentsResponse,InputComment } from '@custom-types/interfaces';
import { v4 as uuidv4 } from 'uuid';

const getRandomInRange = (from: number, to: number): number => Math.round(Math.random() * (to - from) + from);

const buildCommentsApi = (): CommentApiBuildReturnType => {
  const commentsString: string = localStorage.getItem('comments') ?? '[]';
  const comments: Comment[] = JSON.parse(commentsString);
  const allComments: CommentsMap = comments.reduce(function toMap (acc: CommentsMap, current) {
    const replies: CommentsMap = current.replies.reduce(toMap, {});
    acc[current.id] = current;
    return { ...replies, ...acc };
  }, {});

  const saveComment = (newComment: Comment): Comment[] => {
    comments.push(newComment);
    allComments[newComment.id] = newComment;
    localStorage.setItem('comments', JSON.stringify(comments));
    return comments;
  };

  const replyComment = (replyTo: string, newComment: Comment): Comment[] => {
    allComments[replyTo].replies.push(newComment);
    allComments[newComment.id] = newComment;
    localStorage.setItem('comments', JSON.stringify(comments));
    return [...comments];
  };

  const getComments = (skip: number, count: number): CommentsResponse => ({
    data: comments.slice(skip, skip + count),
    count: comments.length
  });

  return [saveComment, replyComment, getComments];
};

const [saveComment, replyComment, getComments] = buildCommentsApi();

export const addComment = async (inputComment: InputComment): Promise<Comment[]> => await new Promise((resolve, reject) => {
  // Mock network delay
  const randomTime = getRandomInRange(1000, 2000);
  const comment: Comment = {
    ...inputComment,
    id: uuidv4(),
    replies: []
  };

  setTimeout(() => {
    resolve(saveComment(comment));
  }, randomTime);
});

export const replyToComment = async (replyTo: string, inputComment: InputComment): Promise<Comment[]> => await new Promise((resolve, reject) => {
  // Mock network delay
  const randomTime = getRandomInRange(1000, 2000);
  const comment: Comment = {
    ...inputComment,
    id: uuidv4(),
    replies: []
  };
  setTimeout(() => {
    resolve(replyComment(replyTo, comment));
  }, randomTime);
});

export const fetchComments = async (skip: number, count: number): Promise<CommentsResponse> => await Promise.resolve(getComments(skip, count));
