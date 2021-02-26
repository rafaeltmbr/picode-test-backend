## PiCode Test API

This project consists of a simple API for a book management system.

It's important to notice that this is not a real-life application, so **user authentication is left out** for simplicity.

### Routes

#### `GET /books`
This route returns all the books registered in the database in a JSON format. Supported query params:
* tag - filter the books by its tags
* page - return only the results in the specified page
* pageSize - limits the number of results per page

Example:`GET /books?tag=fantasy&page=2&pageSize=10` this route should return up to 10 books that have a tag *fantasy* and are in the second page (i.e. books from position 11 up to 20).

A [HTTP 200 status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200) with the filtered list of books is always returned.

#### `POST /books`
This route allows any user (authentication is not required) add a new book to the system database. Required body JSON fields:
* title - unique title (string)
* author - author name (string)
* description - description (string)
* pages - pages amount (number)
* tags - array of tags (array of strings)

Example:`POST /books`
Body JSON content:
```JSON
{
  "title": "Peter Pan",
  "author": "J. M. Barrie",
  "description": "Peter Pan; or, the Boy Who Wouldn't Grow Up or Peter and Wendy, often known simply as Peter Pan, is a work by J. M. Barrie, in the form of a 1904 play and a 1911 novel.",
  "pages": 182,
  "tags": [
    "fantasy",
    "adventure",
    "novel"
  ]
}
```
If the operation succeeds, a [HTTP 200 status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200) is returned with the contents of the newly registered book in the JSON format. In the other hand, if an error occurs, a [HTTP 400 status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400) is returned instead.

#### `DELETE /books/:id`
This route deletes the book with the specified id (passed through the *id* route param).

Example: `DELETE /books/3` deletes the book with the id number 3 (if it exists). In case of non-existent id, the server returns a [HTTP 400 status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400). In case of success a [HTTP 204 status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204) is returned instead.