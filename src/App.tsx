import React from "react";
import Header from "./components/header";
import { Alert, Col, Row } from "antd";
import Card from "./components/card/Card";
import {
  useGetBrigadesDataQuery,
  useGetConnectionStateQuery,
  useGetDepartmentsQuery,
} from "./store/api/cardInfoQuery";

function App() {
  const {
    isLoading: brigadesIsLoading,
    data: brigadesData,
    isError: brigadesIsError,
    error: brigadesError,
  } = useGetBrigadesDataQuery();
  const {
    isLoading: departmentIsLoading,
    data: departmentData,
    isError: departmentIsError,
    error: departmentError,
  } = useGetDepartmentsQuery();
  const {
    isLoading: connectionStateIsLoading,
    data: connectionStateData,
    isError: connectionStateIsError,
    error: connectionStateError,
  } = useGetConnectionStateQuery();

  console.log(brigadesData);
  if (brigadesIsLoading) return <>Loading...</>;
  if (brigadesIsError) {
    console.log(brigadesError);
    return (
      <Alert type="error" message="Произошла ошибка при загрузке занных" />
    );
  }

  return (
    <>
      <Header />
      {brigadesIsError && (
        <Alert type="error" message="Произошла ошибка при загрузке занных" />
      )}
      {brigadesData?.map(
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
