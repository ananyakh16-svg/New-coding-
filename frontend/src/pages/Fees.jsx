import { useState, useEffect } from "react";
import axios from "axios";

function Fees() {

  const [fees, setFees] = useState([]);

  const [memberName, setMemberName] = useState("");

  const [amount, setAmount] = useState("");

  const [status, setStatus] = useState("");

  const [editId, setEditId] = useState(null);


  useEffect(() => {
    fetchFees();
  }, []);


  const fetchFees = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/fees/"
      );

      setFees(response.data);

    } catch (error) {

      console.log(error);
    }
  };


  const addFee = async () => {

    try {

      if (editId !== null) {

        await axios.put(
          `http://127.0.0.1:8000/api/fees/${editId}/`,
          {
            member_name: memberName,
            amount,
            status,
          }
        );

        setEditId(null);

      } else {

        await axios.post(
          "http://127.0.0.1:8000/api/fees/",
          {
            member_name: memberName,
            amount,
            status,
          }
        );
      }

      fetchFees();

      setMemberName("");
      setAmount("");
      setStatus("");

    } catch (error) {

      console.log(error);
    }
  };


  const deleteFee = async (id) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/fees/${id}/`
      );

      fetchFees();

    } catch (error) {

      console.log(error);
    }
  };


  const editFee = (fee) => {

    setMemberName(fee.member_name);

    setAmount(fee.amount);

    setStatus(fee.status);

    setEditId(fee.id);
  };


  return (

    <div className="members-page">

      <h1>Membership Fees Page</h1>

      <div className="member-form">

        <input
          type="text"
          placeholder="Member Name"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Status (Paid/Unpaid)"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <button onClick={addFee}>

          {editId !== null ? "Update Fee" : "Add Fee"}

        </button>

      </div>


      <div className="members-list">

        {fees.map((fee) => (

          <div className="member-card" key={fee.id}>

            <h2>{fee.member_name}</h2>

            <p>Amount: ₹{fee.amount}</p>

            <p>Status: {fee.status}</p>

            <button onClick={() => editFee(fee)}>
              Edit
            </button>

            <button onClick={() => deleteFee(fee.id)}>
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Fees;