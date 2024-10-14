import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

type UserSquema = {
    name: String,
    id: String
}

// Mock database
const users: UserSquema[] = [];

// Getting the list of users from the mock database
router.get('/', (req, res) => {
    res.send(users);
})

// Get user by uuid
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id)

    res.send(foundUser)
});

// Post new user (uuid is added regardless)
router.post('/', (req, res) => {
    const user = req.body;

    users.push({ ...user, id: uuidv4() });

    res.send(`${user.name} has been added to the Database`);
});

// Patch specific data from already existing objects
router.patch('/:id', (req, res) => {
    const { id } = req.params;
  
    const { first_name, last_name, email} = req.body;
  
    const user = users.find((user) => user.id === id)
  
    //if(first_name) user.first_name = first_name;
    //if(last_name) user.last_name = last_name;
    //if(email) user.email = email;
  
    res.send(`User with the ${id} has been updated`)
  
});

// Delete specific user by uuid
router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    //users = users.filter((user) => user.id !== id)
  
    res.send(`${id} deleted successfully from database`);
});

export default router
