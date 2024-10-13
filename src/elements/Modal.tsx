import { useEffect } from "react";
import MicroModal from 'micromodal';

interface Props {
  id: string;
  isOpen: boolean;
  children: React.ReactNode;
}

MicroModal.init()

function Modal({ children, id, isOpen }: Props) {

  useEffect(() => {
    if (isOpen) MicroModal.show(id);
  }, [isOpen])

  return (
    <div className="modal micromodal-slide" id={id} aria-hidden="true">
      <div className="modal-overlay" tabIndex={-1} data-micromodal-close>
        <div className="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
          {children}
        </div>
      </div>
    </div>
  );
}

function ModalHeader({ id, children, onClose }: { id: string; children: React.ReactNode; onClose(): void; }) {

  const dismiss = () => {
    MicroModal.close(id);
    onClose();
  }

  return (
    <header className="modal-header">
      <h2 className="modal-title">{children}</h2>
      <button className="modal-close" onClick={dismiss}></button>
    </header>
  )
}

function ModalContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="modal-content">
      {children}
    </main>
  )
}

function ModalFooter({ children }: { children: React.ReactNode }) {
  return (
    <footer className="modal-footer">
      {children}
    </footer>
  )
}

export default {
  Root: Modal,
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter
}
