import "../styles/dashboard.css";

function Card({ children, onClick }) {
  return (
    <div className="card" onClick={onClick} style={{ cursor: "pointer" }}>
      {children}
    </div>
  );
}

function CardContent({ children }) {
  return <div className="card-content">{children}</div>;
}

export default { Card, CardContent };