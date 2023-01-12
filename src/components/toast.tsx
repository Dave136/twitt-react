import { useToast } from '../context/toast-context';

export default function Toast() {
  const { type, message } = useToast();

  const alertType = {
    info: 'alert-info',
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    default: '',
  };

  if (!message) return null;

  return (
    <div className="toast toast-top toast-end">
      <div className={`alert ${alertType[type] || alertType.default}`}>
        <div>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}
