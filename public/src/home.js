function getTotalBooksCount(books) {
  return books.map(book => book).length;
}

const getTotalAccountsCount = accounts => {
  return accounts.map(acc => acc).length;
}

function getBooksBorrowedCount(books) {
  return books.map(borrow => borrow.borrows[0]).filter(ret => ret.returned === false).length;
}

function getMostCommonGenres(books) {
  let bookGenres = {};

  for (gen in books) {
    if (bookGenres[books[gen].genre]) {
      bookGenres[books[gen].genre] += 1;
    } else {
      bookGenres[books[gen].genre] = 1;
    }
  }
  return Object.keys(bookGenres)
    .sort((a, b) => bookGenres[b] - bookGenres[a])
    .filter((_, index) => index < 5)
    .map(key => {
      return {
        name: key,
        count: bookGenres[key]
      }
    });
}

function getMostPopularBooks(books) {
  let results = [];

  for (book in books) {
    const title = books[book].title;
    const counts = books[book].borrows.length;
    results.push({
      name: title,
      count: counts
    })
  }
  return results
    .sort((a, b) => b.count - a.count)
    .filter((_, index) => index < 5);
}

function getMostPopularAuthors(books, authors) {
  
  let authId = [];

    for (book in books) {
    authId.push(books[book].authorId);
  }

  let authorNames = authors
  .filter(ids => authId.includes(ids.id))
  .reduce((acc, authName) => {
    acc.push( {
      id:parseInt(`${authName.id}`), 
      name:`${authName.name.first} ${authName.name.last}`
      } );
    return acc;
  }, []);

  let counts = books.reduce((acc, book) => {
    if (acc[book.authorId]) {
      acc[book.authorId] += book.borrows.length;
      return acc;
    } else {
      acc[book.authorId] = book.borrows.length;
      return acc;
    }
  }, {});

  let final = authorNames.filter(name => name.id in counts).reduce((acc, names, index) => {
    acc.push({name:`${names.name}`, count:parseInt(`${counts[names.id]}`)});
        return acc;
      }, []);

  return final
  .sort((a, b) => b.count - a.count)
  .filter((_, index) => index < 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};