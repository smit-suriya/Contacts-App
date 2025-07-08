import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./features/auth/pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import PrivateRoute from "./routes/PrivateRoute";
import ContactList from "./features/contacts/pages/ContactList";
import Register from "./features/auth/pages/Register";
import ContactForm from "./features/contacts/pages/ContactForm";
import EditContactForm from "./features/contacts/pages/EditContactForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<ContactList />} />
        </Route>
        <Route path="/add-contact" element={<ContactForm />} />
        <Route path="/edit-contact/:id" element={<EditContactForm />} />
      </Routes>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
