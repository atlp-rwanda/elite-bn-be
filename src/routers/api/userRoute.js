import express from 'express';
import {login} from '../../controllers/user.controller';

const user = express.Router();

user.post('/', login);
user.get('/', )

export default user
