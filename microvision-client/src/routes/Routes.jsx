// microvision-client/src/routes/Routes.jsx
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ui/ProtectedRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Pathologist/Dashboard';
import AdminDashboard from '../pages/Admin/Dashboard';
import UploadSlide from '../pages/Pathologist/UploadSlide';
import MySlides from '../pages/Pathologist/MySlides';
import Collections from '../pages/Pathologist/Collections';
import SharedWithMe from '../pages/Pathologist/SharedWithMe';
import Messages from '../pages/Pathologist/Messages';
import BlogUpload from '../pages/Pathologist/BlogUpload';
import BlogList from '../pages/Pathologist/BlogList';
import BlogDetail from '../pages/Pathologist/BlogDetail'; 

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Pathologist Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute requiredRole="pathologist">
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/upload" 
        element={
          <ProtectedRoute requiredRole="pathologist">
            <UploadSlide />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/myslides" 
        element={
          <ProtectedRoute requiredRole="pathologist">
            <MySlides />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/collections" 
        element={
          <ProtectedRoute requiredRole="pathologist">
            <Collections />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/shared" 
        element={
          <ProtectedRoute requiredRole="pathologist">
            <SharedWithMe />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/messages" 
        element={
          <ProtectedRoute requiredRole="pathologist">
            <Messages />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/blog" 
        element={
          <ProtectedRoute requiredRole="pathologist">
            <BlogList />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/blogs/upload" 
        element={
          <ProtectedRoute requiredRole="pathologist">
            <BlogUpload />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/blogs/:id" 
        element={
          <ProtectedRoute requiredRole="pathologist">
            <BlogDetail />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
