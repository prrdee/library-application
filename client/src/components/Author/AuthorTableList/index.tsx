import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useSelector, useDispatch } from 'react-redux'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {
  fetchAuthorsThunk,
  removeAuthorThunk,
} from '../../../redux/actions/author'
import { AppState } from '../../../types'
import EditAuthorForm from '../EditAuthorForm'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

export default function AuthorTableList() {
  const classes = useStyles()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAuthorsThunk())
  }, [dispatch])

  const authors = useSelector((state: AppState) => state.author.authors)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="authors table">
        <TableHead>
          <TableRow>
            <TableCell>FirstName</TableCell>
            <TableCell>LastName</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map(author => (
            <TableRow key={author.firstName}>
              <TableCell component="th" scope="row">
                {author.firstName}
              </TableCell>
              <TableCell align="right">{author.lastName}</TableCell>
              <TableCell>
                <IconButton
                  color="secondary"
                  aria-label="delete book"
                  component="span"
                  onClick={() => {
                    if (window.confirm(`Delete ${author.firstName}`)) {
                      dispatch(removeAuthorThunk(author))
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <EditAuthorForm author={author} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
