interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/65 flex items-center justify-center z-50">
      {children}
    </div>
  );
}
