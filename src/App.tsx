import React from "react";
import Header from "./components/header";
import { Alert, Col, Row } from "antd";
import Card from "./components/card/Card";
import { useGetBrigadesDataQuery } from "./store/api/cardInfoQuery";

function App() {
  const { isLoading, data, isError, error } = useGetBrigadesDataQuery();
  console.log(data);
  if (isLoading) return <>Loading...</>;
  if (isError) return <Alert type="error" message="Произошла ошибка при загрузке занных" />;

  return (
    <>
      <Header />
      {
        isError && <Alert type="error" message="Произошла ошибка при загрузке занных" />
      }
      {data?.map(
        ({ brigade_name, connectionStateId, department, position, id }) => {
          return (
            <Card
              key={id}
              brigade={brigade_name}
              cluster={position.cluster}
              connection={connectionStateId === 0 ? "Недоступен" : "Доступен"}
              department={
                department.id === 0
                  ? "Лукойл"
                  : department.id === 1
                  ? "Роснефть"
                  : "Газпром нефть"
              }
              field={position.field}
              well={position.well}
            ></Card>
          );
        }
      )}
    </>
  );
}

export default App;
