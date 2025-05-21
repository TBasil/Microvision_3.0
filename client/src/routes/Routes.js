// client/src/routes/Routes.js
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Pathologist/Dashboard';
import AdminDashboard from '../pages/Admin/Dashboard';
import UploadSlide from '../pages/UploadSlide';
import MySlides from '../pages/MySlides';
import Collections from '../pages/Collections';
import SharedWithMe from '../pages/SharedWithMe';
import Messages from '../pages/Messages';
import BlogUpload from '../pages/BlogUpload';
import BlogList from '../pages/BlogList';

export default function AppRoutes() {
  return (
    <Routes>
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
