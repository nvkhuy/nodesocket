import {User} from "../models/user";

const users: User[] = [
    {username: 'john', password: 'password123'},
    {username: 'jane', password: 'password456'}
];

function find(username: string, password: string): User | undefined {
    return users.find(u => u.username === username && u.password === password);
}

function getByUsername(username: string): User | undefined {
    return users.find(u => u.username === username);
}

export default {
    find, getByUsername
}