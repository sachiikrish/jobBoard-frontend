import ToastContainer from "react-bootstrap/ToastContainer";
import { Toast } from "react-bootstrap";

export const AuthToast = ({toastSuccess, closeToast, message}) => {
  return (
    <ToastContainer position="top-end" className="p-3">
    <Toast
      show={toastSuccess}
      onClose={closeToast}
      bg="success"
      delay={3000}
      autohide
    >
      <Toast.Body className="text-white">{message}</Toast.Body>
    </Toast>
  </ToastContainer>
  )
}
