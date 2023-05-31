import { useQuery } from 'react-query';
import { getUsers } from '../../api/users';

export const useUsers = () => {
  return useQuery('/users', async () => {
    const users = await getUsers();
    return users;
  });
};
