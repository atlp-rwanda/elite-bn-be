import users from '../controllers/user';
import Requests from '../controllers/request';

export default (app) => {

app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the bookStore API!',
}));

app.post('/api/users', users.signUp); // API route for user to signup
app.post('/api/users/:id/requests', Requests.create); // API route for user to create a request
app.get('/api/requests', Requests.list); // API route for user(admin) to get all requests in the database
app.put('/api/requests/:requestId', Requests.modify); // API route for user to edit his/her request
app.delete('/api/requests/:requestId', Books.delete); // API route for user to delete a request
};