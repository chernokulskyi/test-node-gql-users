import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  GET_ALL_USERS,
  // GET_ONE_USER,
  CREATE_USER,
} from './query/user';
import './App.css';

const App = () => {
  const { data, loading, refetch } = useQuery(GET_ALL_USERS);
  //   const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
  //     variables: {
  //       id: 1,
  //     },
  //   });
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
    // eslint-disable-next-line
  }, [data]);

  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username,
          age: parseInt(age),
        },
      },
    }).then(({ data }) => {
      console.log(data);
      setUsername('');
      setAge(0);
    });
  };
  const getAll = (e) => {
    e.preventDefault();
    refetch();
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <form>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type='text'
        />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type='number'
        />
        <div>
          <button onClick={(e) => addUser(e)}>create</button>
          <button onClick={(e) => getAll(e)}>get</button>
        </div>
      </form>
      <div>
        {users.map((user) => (
          <div className='user' key={user.id}>
            {user.id}. {user.username} {user.age}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
