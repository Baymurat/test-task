import { InputComment } from '@custom-types/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { FC } from 'react';
import { Resolver,useForm } from 'react-hook-form';
import * as yup from 'yup';

import styles from './style.module.scss';

interface Props {
  onSubmit: (comment: InputComment) => void
}

interface FormValues {
  email: string,
  name: string,
  text: string
}

const resolver: Resolver<FormValues> = yupResolver(
  yup.object().shape({
    name: yup.string().trim().required(),
    email: yup.string().trim().required(),
    text: yup.string().trim().required()
  }).required());

const CommentForm: FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({ resolver });

  const submitForm = handleSubmit(({ name, email, text }) => {
    onSubmit({ name, email, text });
    reset({ name: '', email: '', text: '' });
  });

  return (
    <div className={styles.container}>
      <TextField
        {...register('name')}
        error={!(errors.name == null)}
        className={styles.nameField}
        hiddenLabel
        id="filled-hidden-label-small"
        placeholder='Your name'
        type={'text'}
        size="small"
      />
      <TextField
        {...register('email')}
        error={!(errors.email == null)}
        className={styles.emailField}
        hiddenLabel
        id="filled-hidden-label-small"
        placeholder='Your email'
        type={'email'}
        size="small"
        required
      />
      <div className={styles.submitBlock}>
        <TextField
          {...register('text')}
          error={!(errors.text == null)}
          className={styles.commentField}
          hiddenLabel
          id="filled-hidden-label-small"
          placeholder='Type comment...'
          size="small"
        />
        <Button onClick={submitForm} >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
