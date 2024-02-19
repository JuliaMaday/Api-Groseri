import app from './app.js';
import database from './db.js';
const c = console.log.bind(console);
const port = process.env.SERVER_PORT;

app.listen(port, () => { 
    c(`Server on port ${port}`);
});


