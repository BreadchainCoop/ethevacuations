import { useEffect, useState } from "react";
import MicroModal from 'micromodal';

interface Props {
  id: string;
  title: string;
  isOpen: boolean;
  onClose(): void;
  children: React.ReactNode;
}

MicroModal.init();

function Modal(props: Props) {
  const [isInitialised, setInitialisation] = useState(false);

  const dismiss = () => {
    MicroModal.close(props.id);
    props.onClose();
  }

  useEffect(() => {
    if (props.isOpen) {
      setInitialisation(true);
      MicroModal.show(props.id);
    } else if (isInitialised) {
      MicroModal.close(props.id);
    }
  }, [props.isOpen])

  return (
    <div className="modal micromodal-slide" id={props.id} aria-hidden="true">
      <div className="modal-overlay" tabIndex={-1} data-micromodal-close>
        <div className="modal-container" role="dialog" aria-modal="true">
          <header className="modal-header">
            <h2 className="modal-title text-neutral-800">{props.title}</h2>
            <button className="modal-close" onClick={dismiss}></button>
          </header>
          {props.children}
        </div>
      </div>
    </div>
  );
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
  Content: ModalContent,
  Footer: ModalFooter
}
