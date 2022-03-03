import React from "react";
import {Navbar, Nav, NavItem, NavbarBrand} from 'react-bootstrap'
import { Link } from "react-router-dom";

function ForumNavBar({ userName }) {
  return (
    <Navbar className="sticky-top navbar-light bg-light">
      <NavbarBrand className="p-3" href="/">
         Forum
      </NavbarBrand>
      
      <Nav className="  flex-row ml-md-auto d-none d-md-flex">
        <NavItem>        <span className="p-3 navbar-text">
        {userName}
        </span> </NavItem>
        <NavItem>        <span className="p-3 navbar-text">
        <Link to="/logout"> Logout</Link>
        </span> </NavItem>
    </Nav>
      
    </Navbar>
      );
}

export default ForumNavBar;
