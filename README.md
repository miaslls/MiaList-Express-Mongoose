# MiaList - Express - Mongoose

## **TODO**:

- ## **ENTRY**

- 🔳 add entry to list on POST

- 🔳 add/remove entry from list on PATCH

- 🔳 remove entry from list on DELETE

- 🔳 validate CREATE

  - 🔳 body (middleware)

- 🔳 validate UPDATE

  - 🔳 body (middleware)
  - ✅ id (middleware, general)

- ## **LIST**

- ✅ add list to category on POST

- ✅ add/remove list from category on PATCH

- ✅ remove list from category on DELETE

- ✅ validate CREATE

  - ✅ body (middleware)
  - ✅ existing list title (controller)

- ✅ validate UPDATE

  - ✅ body (middleware)
  - ✅ existing ist title (controller)
  - ✅ id (middleware, general)

- ## **CATEGORY**

  - ✅ validate CREATE
    - ✅ body (middleware)
    - ✅ existing categ name (controller)
  - ✅ validate UPDATE
    - ✅ body (middleware)
    - ✅ existing category name (controller)
    - ✅ id (middleware, general)

- ### **USER**

  - ✅ protect routes (except create)
  - ✅ admin routes (except update !== isAdmin)
  - ✅ ❗ update password (bcrypt, etc...)
  - ✅ validate CREATE
    - ✅ body (middleware)
    - ✅ existing username (controller)
  - ✅ validate UPDATE
    - ✅ body (middleware)
    - ✅ existing username (controller)
    - ✅ id (middleware, general)
