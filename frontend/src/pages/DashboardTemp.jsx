function Dashboard() {

  return (

    <div className="dashboard">

      <h1>Club Management Dashboard</h1>

      <div className="dashboard-cards">

        <div className="card">
          <h2>Total Members</h2>
          <p>25</p>
        </div>

        <div className="card">
          <h2>Total Events</h2>
          <p>10</p>
        </div>

        <div className="card">
          <h2>Total Meetings</h2>
          <p>15</p>
        </div>

        <div className="card">
          <h2>Total Fees</h2>
          <p>₹5000</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;