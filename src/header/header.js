import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import { IoIosLogOut } from "react-icons/io";
import mowbluelogo from "../gallery/moe-bluelogo.png"
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { PlayerContext } from "../context/playerContext";

const Header = () => {
  const userContext = useContext(UserContext);
  const playerContext = useContext(PlayerContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    userContext.setUser(null);
    playerContext.setPlayer(null);
    navigate("/");
  };

  return (
    <Navbar light expand="md" className="container-fluid is-italic header">
      <Link to="/">
        <img src={mowbluelogo} alt="Your" width="200" height="200" />
      </Link>

      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {userContext.user ? (
            <>
              <NavbarText>
                <VscAccount size={30} />{" "}
                {userContext.user?.email ? userContext.user.email : ""}
              </NavbarText>
              <NavItem className="float-end login ">
                <NavLink
                  data-toggle="tooltip"
                  data-placement="right"
                  title="To Log out"
                  onClick={handleSignOut}
                  className=" offset-lg-3 navbar-end "
                >
                  <b>Sign Out</b> <IoIosLogOut size={30} />
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
             
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/signin"
                  className=" ml-auto"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Login to an existing account"
                >
                  <b>Sign In</b>
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
