// components/ToastManager.jsx
import { toast } from 'react-toastify';
import { CheckCircle as CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';

const ToastManager = {
  showSuccessToast: (message, options = {}) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: <CheckCircle2 className="w-5 h-5" />,
      style: {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        fontWeight: '600',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
      },
      ...options
    });
  },

  showErrorToast: (message, options = {}) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: <XCircle className="w-5 h-5" />,
      style: {
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        color: 'white',
        fontWeight: '600',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)'
      },
      ...options
    });
  },

  showWarningToast: (message, options = {}) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 4500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: <AlertTriangle className="w-5 h-5" />,
      style: {
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        color: 'white',
        fontWeight: '600',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)'
      },
      ...options
    });
  },

  showInfoToast: (message, options = {}) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: <Info className="w-5 h-5" />,
      style: {
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        color: 'white',
        fontWeight: '600',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
      },
      ...options
    });
  }
};

export default ToastManager;