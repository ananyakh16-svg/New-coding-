import { useState, useEffect } from "react";
import axios from "axios";

function Members() {

  const [members, setMembers] = useState([]);

  const [name, setName] = useState("");

  const [role, setRole] = useState("");

  const [editId, setEditId] = useState(null);


  useEffect(() => {
    fetchMembers();
  }, []);


  const fetchMembers = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/members/"
      );

      setMembers(response.data);

    } catch (error) {

      console.log(error);
    }
  };


  const addMember = async () => {

    try {

      if (editId !== null) {

        await axios.put(
          `http://127.0.0.1:8000/api/members/${editId}/`,
          {
            name,
            role,
          }
        );

        setEditId(null);

      } else {

        await axios.post(
          "http://127.0.0.1:8000/api/members/",
          {
            name,
            role,
          }
        );
      }

      fetchMembers();

      setName("");
      setRole("");

    } catch (error) {

      console.log(error);
    }
  };


  const deleteMember = async (id) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/members/${id}/`
      );

      fetchMembers();

    } catch (error) {

      console.log(error);
    }
  };


  const editMember = (member) => {

    setName(member.name);

    setRole(member.role);

    setEditId(member.id);
  };


  return (

    <div className="members-page">

      <h1>Members Page</h1>

      <div className="member-form">

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <button onClick={addMember}>

          {editId !== null ? "Update Member" : "Add Member"}

        </button>

      </div>


      <div className="members-list">

        {members.map((member) => (

          <div className="member-card" key={member.id}>

            <h2>{member.name}</h2>

            <p>{member.role}</p>

            <button onClick={() => editMember(member)}>
              Edit
            </button>

            <button onClick={() => deleteMember(member.id)}>
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Members;
