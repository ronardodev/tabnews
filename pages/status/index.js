import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  let updatedAt = "Carregando...";

  if (!isLoading && data) {
    updatedAt = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Updated at: {updatedAt}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  let databaseStatus = "Carregando...";

  if (!isLoading && data) {
    databaseStatus = (
      <>
        <p>Host: {data.database.host}</p>
        <p>Version: {data.database.version}</p>
        <p>Active Connections: {data.database.active_conns}</p>
        <p>Max Connections: {data.database.max_conns}</p>
      </>
    );
  }

  return (
    <>
      <h2>Database</h2>
      <div>{databaseStatus}</div>
    </>
  );
}

// function CapsLock(props) {
//   console.log(props);
//   const textoEmMaiusculo = props.texto.toUpperCase();
//   return <p>{textoEmMaiusculo}</p>;
// }

// export default function StatusPage() {
//   return (
//     <>
//       <h1>Status</h1>
//       <CapsLock texto="Status teste" />
//     </>
//   );
// }
