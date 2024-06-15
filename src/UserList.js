
import axios from "axios";
import { useEffect, useState } from "react";

export function UserList({ users, setUsers }) {
  const [editUserId, setEditUserId] = useState(null);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://65e6af51d7f0758a76e8c452.mockapi.io/learn")
      .then((res) => setUsers(res.data));
  }, []);

  const handleEdit = (userId) => {
    setEditUserId(userId);
    axios
      .get(`https://65e6af51d7f0758a76e8c452.mockapi.io/learn/${userId}`)
      .then((res) => {
        setEditUser(res.data);
      });
  };

  const handleSave = () => {
    if (!editUser) return; // Ensure editUser is not null before saving

    axios
      .put(
        `https://65e6af51d7f0758a76e8c452.mockapi.io/learn/${editUserId}`,
        editUser
      )
      .then(() => {
        // Update the user list with the edited user
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editUserId ? { ...user, ...editUser } : user
          )
        );
        // Reset editUserId to exit edit mode
        setEditUserId(null);
        // Clear the editUser state
        setEditUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevEditUser) => ({
      ...prevEditUser,
      [name]: value,
    }));
  };

  const handleDelete = (userId) => {
    axios
      .delete(`https://65e6af51d7f0758a76e8c452.mockapi.io/learn/${userId}`)
      .then(() => {
        // Remove the deleted user from the user list
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {" "}
      <h3>This is userlist</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editUserId === user.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editUser?.name || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{user.name}</p>
                )}
              </td>
              <td>
                {editUserId === user.id ? (
                  <input
                    type="text"
                    name="email"
                    value={editUser?.email || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{user.email}</p>
                )}
              </td>
              <td>
                {editUserId === user.id ? (
                  <button onClick={handleSave}>SAVE</button>
                ) : (
                  <button onClick={() => handleEdit(user.id)}>edit</button>
                )}
                <button onClick={() => handleDelete(user.id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}