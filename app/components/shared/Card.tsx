import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div
      className="card"
      style={{
        backgroundColor: '#fff',
        color: 'rgba(0, 0, 0, 0.4)',
      }}
    >
      {children}
    </div>
  );
};

export default Card;
