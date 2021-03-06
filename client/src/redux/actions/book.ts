import { Dispatch } from 'redux'
import BookService from '../../services/books'
import LendingService from '../../services/lendings'

import {
  GET_ALL_BOOKS,
  CREATE_BOOK,
  BORROW_UNBORROW_BOOK,
  REMOVE_BOOK,
  BookActions,
  Book,
  BookFormValues,
  UPDATE_BOOK,
  FILTER_ALL_BOOKS,
} from '../../types'

export const getAllBooks = (books: Book[]): BookActions => {
  return {
    type: GET_ALL_BOOKS,
    payload: {
      books,
    },
  }
}

export const createBook = (book: Book): BookActions => {
  return {
    type: CREATE_BOOK,
    payload: {
      book,
    },
  }
}

export const removeBook = (book: Book): BookActions => {
  return {
    type: REMOVE_BOOK,
    payload: {
      book,
    },
  }
}

export const updateBook = (book: Book): BookActions => {
  return {
    type: UPDATE_BOOK,
    payload: {
      book,
    },
  }
}

export const borrowUnborrowBook = (book: Book): BookActions => {
  return {
    type: BORROW_UNBORROW_BOOK,
    payload: {
      book,
    },
  }
}

export const filterAllBooks = (searchText: string): BookActions => {
  return {
    type: FILTER_ALL_BOOKS,
    payload: {
      searchText,
    },
  }
}

/*Here in these async functions I am passing dispatch from redux to
 the services of book to dispatch necessary actions to the store
 this way these actions will look more clean as I will have more actions
 added here in the future*/
export function fetchBooksThunk() {
  return async (dispatch: Dispatch) => {
    return BookService.getAll(dispatch)
  }
}

/*here BookFromValues is a type of book but it do not require _id
because that is created by the database which we will use to delete book*/
export function addBookThunk(book: BookFormValues) {
  return async (dispatch: Dispatch) => {
    return BookService.create(book, dispatch)
  }
}

export function removeBookThunk(book: Book) {
  return async (dispatch: Dispatch) => {
    return BookService.deleteThis(book, dispatch)
  }
}

export function updateBookThunk(book: Book) {
  return async (dispatch: Dispatch) => {
    return BookService.updateThis(book, dispatch)
  }
}

export function borrowBookThunk(book: Book) {
  return async (dispatch: Dispatch) => {
    return LendingService.borrow(book, dispatch)
  }
}

export function unborrowBookThunk(book: Book) {
  return (dispatch: Dispatch) => {
    return LendingService.unBorrow(book, dispatch)
  }
}
