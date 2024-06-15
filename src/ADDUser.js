import React, { useState } from 'react';
import axios from 'axios';

export function ADDUser({ users, setUsers }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    const newUser = {
      name: name,
      email: email
    };

    axios.post('https://65e6af51d7f0758a76e8c452.mockapi.io/learn', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setName('')
        setEmail('')
      })
      .then(console.log(users))
      .catch(error => {
        console.error(error);
      });


  };

  return (
    <div>
      please enter details
      Name: <input type='text' placeholder='name' value={name} onChange={(event) => (setName(event.target.value))}></input>
       Email: <input type='text' placeholder='email' value={email} onChange={(event) => (setEmail(event.target.value))}></input>
      <button onClick={handleSubmit}>ADD</button>
    </div>
  );

}
