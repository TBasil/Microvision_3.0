import { Routes, Route } from 'react-router-dom';

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

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/upload" element={<UploadSlide />} />
      <Route path="/myslides" element={<MySlides />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/shared" element={<SharedWithMe />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/upload" element={<BlogUpload />} />
    </Routes>
  );
}