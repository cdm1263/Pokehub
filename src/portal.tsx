import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface portalProps {
  children: ReactNode;
}

export const Modalportal = ({ children }: portalProps) => {
  const el = document.getElementById('modal')!;
  return ReactDOM.createPortal(children, el);
};
