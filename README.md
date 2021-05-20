# Backend for a blogging system

Imagine a *MERN* stack but instead of React it uses Redis(thats the R part)... thats basically what this is. 
The blogging system uses Express and Nodejs, for the database element to store and retrieve data I used MongoDB. The implementation 
of bcrypt allows for user passwords to be hashed within the database (no plaintext passwords!). I then have redis for caching user sessions 
when the login endpoint is used, thus caching the user session. There is a middleware called *protect* that is passed to each router in routes,
this middleware will check if a user session is active. 
