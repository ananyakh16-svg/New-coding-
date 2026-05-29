import { useState, useEffect } from "react";
import axios from "axios";

function Meetings() {

  const [meetings, setMeetings] = useState([]);

  const [title, setTitle] = useState("");

  const [date, setDate] = useState("");

  const [notes, setNotes] = useState("");

  const [editId, setEditId] = useState(null);


  useEffect(() => {
    fetchMeetings();
  }, []);


  const fetchMeetings = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/meetings/"
      );

      setMeetings(response.data);

    } catch (error) {

      console.log(error);
    }
  };


  const addMeeting = async () => {

    try {

      if (editId !== null) {

        await axios.put(
          `http://127.0.0.1:8000/api/meetings/${editId}/`,
          {
            title,
            date,
            notes,
          }
        );

        setEditId(null);

      } else {

        await axios.post(
          "http://127.0.0.1:8000/api/meetings/",
          {
            title,
            date,
            notes,
          }
        );
      }

      fetchMeetings();

      setTitle("");
      setDate("");
      setNotes("");

    } catch (error) {

      console.log(error);
    }
  };


  const deleteMeeting = async (id) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/meetings/${id}/`
      );

      fetchMeetings();

    } catch (error) {

      console.log(error);
    }
  };


  const editMeeting = (meeting) => {

    setTitle(meeting.title);

    setDate(meeting.date);

    setNotes(meeting.notes);

    setEditId(meeting.id);
  };


  return (

    <div className="members-page">

      <h1>Meetings Page</h1>

      <div className="member-form">

        <input
          type="text"
          placeholder="Meeting title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Meeting notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button onClick={addMeeting}>

          {editId !== null ? "Update Meeting" : "Add Meeting"}

        </button>

      </div>


      <div className="members-list">

        {meetings.map((meeting) => (

          <div className="member-card" key={meeting.id}>

            <h2>{meeting.title}</h2>

            <p>{meeting.date}</p>

            <p>{meeting.notes}</p>

            <button onClick={() => editMeeting(meeting)}>
              Edit
            </button>

            <button onClick={() => deleteMeeting(meeting.id)}>
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Meetings;