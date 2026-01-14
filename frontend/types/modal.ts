// Type for properties to pass to generic modal
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  children: React.ReactNode;
}
