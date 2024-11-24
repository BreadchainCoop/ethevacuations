import MicroModal from 'micromodal';
import { useEffect, useState, useRef } from "react";

interface Props {
  id: string;
  title?: string;
  isOpen: boolean;
  onClose(): void;
  children: React.ReactNode;
}

function Modal(props: Props) {
  const [isInitialised, setInitialisation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const dismiss = () => {
    setIsClosing(true);

    // Clear any existing timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    // Set timeout for animation duration
    closeTimeoutRef.current = setTimeout(() => {
      props.onClose();
      setIsClosing(false);
    }, 300); // Match this with your animation duration
  };

  useEffect(() => {
    if (props.isOpen) {
      setInitialisation(true);
      document.body.style.overflow = 'hidden';
    } else if (isInitialised) {
      document.body.style.overflow = 'unset';
    }

    // Cleanup timeout on unmount
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      document.body.style.overflow = 'unset';
    };
  }, [props.isOpen, isInitialised]);

  return (
    <div
      className={`modal micromodal-slide ${isMobile ? 'mobile-sheet' : ''} ${props.isOpen ? 'is-open' : ''}`}
      id={props.id}
      aria-hidden={!props.isOpen}
    >
      <div
        className={`modal-overlay ${isClosing ? 'is-closing' : ''}`}
        tabIndex={-1}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            dismiss();
          }
        }}
      >
        <div
          className={`modal-container ${isClosing ? 'is-closing' : ''}`}
          role="dialog"
          aria-modal="true"
          onClick={e => e.stopPropagation()}
        >
          {isMobile && (
            <div className="sheet-indicator">
              <div className="sheet-indicator-bar" />
            </div>
          )}
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
  );
}

function ModalFooter({ children }: { children: React.ReactNode }) {
  return (
    <footer className="modal-footer">
      {children}
    </footer>
  );
}

export default {
  Root: Modal,
  Content: ModalContent,
  Footer: ModalFooter
};
