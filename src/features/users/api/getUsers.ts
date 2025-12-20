import { User } from '../types';

const USERS_URL = 'https://jsonplaceholder.org/users';

export async function getUsers(): Promise<User[]> {
  const response = await fetch(USERS_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const data: User[] = await response.json();

  return data.map((user) => ({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
  }));
}
