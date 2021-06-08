
function findAccountById(accounts, id) {
  return accounts.find(acc => acc.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((nameA, nameB) => nameA.name.last > nameB.name.last ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  return totalNumber = books.map(book => book.borrows).flat().filter(ids => ids.id === account.id).length;
}

function getBooksPossessedByAccount(account, books, authors) {
  let results = [];
  for (book in books) {
    if (books[book].borrows.filter(ids => ids.id === account.id && ids.returned === false).length) {
      const found = {
        ...books[book],
        author:authors.find(auth => auth.id === books[book].authorId)
      };
      results.push(found);
    }
  }
  return results;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
