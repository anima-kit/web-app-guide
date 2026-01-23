// Type for properties to pass to generic modal
export interface ModalProps {
  open: boolean;
  title?: string | React.ReactNode;
  children: React.ReactNode;
  onSubmit?: () => void;
  onClose: () => void;
}
