import React from 'react';
import { NavLink } from 'react-router-dom';

// Reusable navigation bar with active link styling
const Navbar: React.FC = () => (
  <nav style={{ display: 'flex', padding: '1rem', gap: '1rem' }}>
    <h1 style={{ marginRight: 'auto' }}>Aussie Travel Explorer</h1>
    <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem', margin: 0 }}>
      <li>
        <NavLink to="/" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/destinations" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
          Destinations
        </NavLink>
      </li>
      <li>
        <NavLink to="/account" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
          Account
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;
