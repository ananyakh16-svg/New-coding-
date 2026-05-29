import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="navbar">

      <h2 className="logo">Club Management</h2>

      <ul className="nav-links">

        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/members">Members</Link>
        </li>

        <li>
          <Link to="/events">Events</Link>
        </li>

        <li>
          <Link to="/meetings">Meetings</Link>
        </li>

        <li>
          <Link to="/fees">Fees</Link>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;