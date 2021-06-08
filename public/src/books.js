function findAuthorById(authors, id) {
  for (let auth in authors) {
    if (authors[auth].id === id) {
      return authors[auth];
    }
  }
}

function findBookById(books, id) {
  return books.find(bookId => bookId.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let trueResult = [];
  let falseResult = [];

  for (book in books) {
    books[book].borrows[0].returned ? trueResult.push(books[book]) : falseResult.push(books[book]);
  }
  return [falseResult, trueResult];
}

function getBorrowersForBook(book, accounts) {

  let results = [];
  let bookId = book.borrows.map(ids => ids.id);

  for (id in accounts) {

    if (bookId.includes(accounts[id].id)) {
      const libre = {
        ...accounts[id],
        returned: book.borrows.find(status => status.returned).returned
      };
      results.push(libre);
    }
  }
  return results;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};