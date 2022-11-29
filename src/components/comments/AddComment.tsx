import React, { FC, useState } from 'react'
import TextField from '@mui/material/TextField'
import styles from './style.module.scss'
import Button from '@mui/material/Button'
import { InputComment } from '../../types/interfaces'

interface Props {
  onSubmit: (comment: InputComment) => void
}

const AddComment: FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [comment, setComment] = useState<string>('')

  return (
    <div className={styles.containerAdd}>
      <TextField
        onChange={({ target }) => setName(target.value)}
        className={styles.nameField}
        hiddenLabel
        id="filled-hidden-label-small"
        placeholder='Your name'
        type={'text'}
        size="small"
        value={name}
      />
      <TextField
        onChange={({ target }) => setEmail(target.value)}
        className={styles.emailField}
        hiddenLabel
        id="filled-hidden-label-small"
        placeholder='Your email'
        type={'email'}
        size="small"
        value={email}
        required
      />
      <div className={styles.submitBlock}>
        <TextField
          onChange={({ target }) => setComment(target.value)}
          className={styles.commentField}
          hiddenLabel
          id="filled-hidden-label-small"
          placeholder='Type comment...'
          size="small"
          value={comment}
          />
        <Button onClick={() => {
          onSubmit({ name, email, comment })
          setName('')
          setEmail('')
          setComment('')
        }}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default AddComment
