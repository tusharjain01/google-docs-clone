import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import Dashboard from './components/DashBoard/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './context/AuthContext';
import Editor from './components/DashBoard/Editor';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path="" element={<ProtectedRoute>
        <Dashboard/>
        </ProtectedRoute>}/>
      <Route path="/edit/:id" element={
      <ProtectedRoute>
        <Editor/>
      </ProtectedRoute>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="signup" element={<SignUp/>}/>
      <Route path="signin" element={<SignIn/>}/>
    </Route>
  )
)
root.render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router = {router}/>
    </AuthProvider>
  </React.StrictMode>
);


