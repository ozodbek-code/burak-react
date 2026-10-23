import React from 'react';

// @ts-ignore
import '../css/app.css';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { RippleBadge } from './MaterialTheme/styled';
import { Link, Route, Switch } from 'react-router-dom';
import { HomePage } from './screens/homePage';
import { ProductsPage } from './screens/productsPage';
import { OrdersPage } from './screens/ordersPage';
import { UserPage } from './screens/userPage';

function App() {
  return (
     <div>
        <nav>
          <ul>
             <li>
              <Link to="/">HomePage</Link>
            </li>
            <li>
              <Link to="/products">ProductsPage</Link>
            </li>
            <li>
              <Link to="/orders">OrdersPage</Link>
            </li>
            <li>
              <Link to="/member-page">Userpage</Link>
            </li>
          </ul>
        </nav>
        
        <Switch>
          <Route path="/products">
            <ProductsPage />
          </Route>
          <Route path="/orders">
            <OrdersPage />
          </Route>
          <Route path="/member-page">
            <UserPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
  );
}



export default App;