==framework and library used:==
1. express framework 
2. ejs 
3. ejs-mate 
4. mongoose
5. method-override (used as a middleware)


==built-in middleware used:==

1. express.static() 
app.use(express.static(path.join(__dirname , "public")));
app.use - Use this middleware for every incoming request
express.static() - This middleware serves static files
path.join() - This part creates the correct folder path safely.

2. express.urlencoded()
Used to read form data sent from HTML forms.

3. express.json()
Used to read JSON data sent from client (frontend, Postman, API).


==file system used:==
1. init 
---contains two files data.js and index.js
- data.js conatains some data that can be used to start the project and for testing everthing
- index.js is used to connect to same database and used to insert the initial data into it

2. models
-- it is used to create all the models used for the project.

3. public
-- contains all the static files like css and js requires for each page.

4. views (includes , layouts)
-- it have all the ejs files required for each page
-- also have two folder includes and layouts
- includes conatains all the elements which is present in all the pages like navbar and footer
- and layout contains ejs file which contains some boilerplate code or a template which will be used by all the ejs files.


==how route matching is done in express.js==
1. path-to-regexp -- is a small JavaScript library used internally by Express.js to convert route paths (like /users/:id) into regular expressions so the server can match incoming URLs and extract parameters. It helps Express understand which route should run when a request comes in.

🔹 Why Express Needs path-to-regexp

When you write:
app.get("/users/:id", (req, res) => {
  res.send(req.params.id);
});

Express must:

Check if request URL matches /users/:id
Extract the id value from URL
Store it in req.params
==This matching + extraction is done using path-to-regexp.==

==* wildcard behaviour in express4 vs express5:==

'*' - 'match anything'
earlier if i write app.get("/api/*", handler); then any request stating with /api will run
without error like /api/123 , /api/apple 

==app.all() vs app.use()==
While both app.all() and app.use() can run code for any HTTP method (GET, POST, PUT, etc.), the way they match the URL path is fundamentally different.

The short version: app.use() is for middleware and matches a path prefix, while app.all() is for routing and matches the exact path.

1. app.use(): The Prefix Matcher (Middleware)
app.use() is designed to mount middleware functions. When you give it a path, it treats that path as a prefix. If a request's URL starts with that path, the middleware will run, no matter what comes after it.

2. app.all(): The Exact Matcher (Routing)
app.all() is a routing method, just like app.get() or app.post(). It attaches a handler to a specific route, but it triggers for all HTTP verbs. It expects an exact match of the route string or pattern you provide.


==Schema Validation==

See we add multiple validation:
1. if there is a client that is uning form to add data then first html form will validate and then only a post request to the server.
2. Now suppose client directly sends a post request to the post endpoint using hoppscotch then ? there is no form ot html validation
3. Therefore it can be solved using two methods: 
a. using validators while defining the schema of the mongoose 
b. using joi library

We use a new npm library known as joi.
Joi is the most powerful schema description language and data validator for JavaScript.
But why to use joi if we already have validators in mongoose ?

while defing the schema in mongoose we can use required, maxLength and all which also act as a validator but but but there is a difference 
Joi and Mongoose validation solve different problems at different stages.

Let's see in detail:
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  age: {
    type: Number,
    min: 18
  }
});
This validation happens when you try to save data to MongoDB.

Joi validates before data reaches database.

Joi validation = Incoming request protection layer
Mongoose validation = Database protection layer

Request → Express → Controller → Mongoose → Error ❌ here we got error at the emd while saving the data to db
Request → Joi Validation  → Controller → Mongoose → Save ✅ here we got error as soon as the request is send

==Error Handling till now==
1. we have used required in HTML form
2. we have used asyncWrap function to handle all the async function.
3. we have also used joi library to handle request directly being send to endpoints.











