interface ErrorMesProps {
  error: string;
}

function ErrorMes({ error }: ErrorMesProps) {
  return (
    <p>
      Error: <span className="error-message">{error}</span>
    </p>
  );
}

export default ErrorMes;
