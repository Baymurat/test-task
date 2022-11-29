import React, { FC, useState } from 'react'
import TextField from '@mui/material/TextField'
import styles from './style.module.scss'
import Button from '@mui/material/Button'
import { InputComment } from '../../../types/interfaces'

interface Props {
  onSubmit: (comment: InputComment) => void
}

const AddComment: FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [text, setText] = useState<string>('')

  return (
    <div className={styles.container}>
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
          onChange={({ target }) => setText(target.value)}
          className={styles.commentField}
          hiddenLabel
          id="filled-hidden-label-small"
          placeholder='Type comment...'
          size="small"
          value={text}
          />
        <Button onClick={() => {
          onSubmit({ name, email, text })
          setName('')
          setEmail('')
          setText('')
        }}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default AddComment
