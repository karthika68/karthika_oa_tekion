import { style } from "../style";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}
 
export function FormField({ label, required = false, error, children }: FormFieldProps) {
  return (
    <div style={style.field}>
      <label style={style.fieldLabel}>
        {label}
        {required && <span style={{ color: "#A32D2D" }}> *</span>}
      </label>
      {children}
      {error && <span style={style.errorMsg}>{error}</span>}
    </div>
  );
}
 