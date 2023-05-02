import { EmptyBlock } from "../../components/emptyBlock";

const ErrorPage = () => {
  return (
    <main
      style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h1
        style={{

          fontSize: '4rem',
          color: '#5E96FC'
        }}
      >
        404
      </h1>
      <EmptyBlock />
    </main>
  );
};
export default ErrorPage;
