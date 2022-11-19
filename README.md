# MiaList - Express - Mongoose

## **TODO**:

- ## **LIST**

- 🔳 add list to category on POST

- 🔳 add/remove list from category on PATCH

- 🔳 remove list from category on DELETE

- 🔳 validate CREATE

  - 🔳 body (middleware)
  - 🔳 existing username (controller)

- 🔳 validate UPDATE

  - 🔳 body (middleware)
  - 🔳 existing category name (controller)
  - 🔳 id (middleware, general)

- ## **CATEGORY**

  - ✅ validate CREATE
    - ✅ body (middleware)
    - ✅ existing username (controller)
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
