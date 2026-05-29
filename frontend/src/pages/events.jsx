import { useState, useEffect } from "react";
import axios from "axios";

function Events() {

  const [events, setEvents] = useState([]);

  const [name, setName] = useState("");

  const [date, setDate] = useState("");

  const [venue, setVenue] = useState("");

  const [editId, setEditId] = useState(null);


  useEffect(() => {
    fetchEvents();
  }, []);


  const fetchEvents = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/events/"
      );

      setEvents(response.data);

    } catch (error) {

      console.log(error);
    }
  };


  const addEvent = async () => {

    try {

      if (editId !== null) {

        await axios.put(
          `http://127.0.0.1:8000/api/events/${editId}/`,
          {
            name,
            date,
            venue,
          }
        );

        setEditId(null);

      } else {

        await axios.post(
          "http://127.0.0.1:8000/api/events/",
          {
            name,
            date,
            venue,
          }
        );
      }

      fetchEvents();

      setName("");
      setDate("");
      setVenue("");

    } catch (error) {

      console.log(error);
    }
  };


  const deleteEvent = async (id) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/events/${id}/`
      );

      fetchEvents();

    } catch (error) {

      console.log(error);
    }
  };


  const editEvent = (event) => {

    setName(event.name);

    setDate(event.date);

    setVenue(event.venue);

    setEditId(event.id);
  };


  return (

    <div className="members-page">

      <h1>Events Page</h1>

      <div className="member-form">

        <input
          type="text"
          placeholder="Event name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        />

        <button onClick={addEvent}>

          {editId !== null ? "Update Event" : "Add Event"}

        </button>

      </div>


      <div className="members-list">

        {events.map((event) => (

          <div className="member-card" key={event.id}>

            <h2>{event.name}</h2>

            <p>{event.date}</p>

            <p>{event.venue}</p>

            <button onClick={() => editEvent(event)}>
              Edit
            </button>

            <button onClick={() => deleteEvent(event.id)}>
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Events;
