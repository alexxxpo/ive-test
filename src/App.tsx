import React, { useEffect, useState } from "react";
import Header from "./components/header";
import { Alert, List} from "antd";
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

  const [connection, setConnection] = useState<string[]>();
  const [dep, setDep] = useState<string[]>();

  useEffect(() => {
    const arr: string[] = [];
    connectionStateData?.forEach((item) => {
      arr[item.connectionStateId] = item.name;
    })
    setConnection(arr);
  }, [connectionStateData]);


  useEffect(() => {
    const arr: string[] = [];
    departmentData?.forEach((item) => {
      arr[item.id] = item.name;
    })
    setDep(arr);
  }, [departmentData]);  

  if (brigadesIsLoading) return <>Loading...</>;
  if (brigadesIsError) console.error(brigadesError);
  
  return (
    <>
      <Header />
      {brigadesIsError && (
        <Alert type="error" message="Произошла ошибка при загрузке занных" />
      )}
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 4,
        }}
        dataSource={brigadesData}
        renderItem={({
          brigade_name,
          connectionStateId,
          department,
          id,
          position,
        }) => (
          <List.Item>
            <Card
              key={id}
              brigade={brigade_name}
              cluster={position.cluster}
              connection={connection ? connection[connectionStateId] : 'Нет данных с сервера'}
              department={dep ? dep[department.id] : 'Нет данных с сервера'}
              field={position.field}
              well={position.well}
            ></Card>
          </List.Item>
        )}
      ></List>
    </>
  );
}
export default App;
