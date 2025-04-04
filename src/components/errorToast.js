import ToastContainer from "react-bootstrap/ToastContainer";
import { Toast } from "react-bootstrap";

export const ErrorToast = ({toastError, closeToast, message}) => {
  return (
    <ToastContainer position="top-end" className="p-3">
    <Toast
      show={toastError}
      onClose={closeToast}
      bg="danger"
      delay={3000}
      autohide
    >
      <Toast.Body className="text-white">{message}</Toast.Body>
    </Toast>
  </ToastContainer>
  )
}
