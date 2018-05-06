# protected-api

A node-express API demonstrating how to use [JWTs][jwt] to authenticate users and protect routes.

### To run
1. `git clone`
1. `npm install`
1. In root, change `configExample` to `config`
1. Change `db.name` and `my_secret_key` inside `config/config.json`.
   - Will work with the current values but not recommended!
1. Start MongoDB locally
1. `npm start`
1. Open to `localhost:3000` in browser.



[jwt]: https://jwt.io/