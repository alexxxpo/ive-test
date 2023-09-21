import { Alert, Button, List } from "antd";
import { useGetBrigadesDataQuery, useGetConnectionStateQuery, useGetDepartmentsQuery } from "../store/api/cardInfoQuery";
import { useEffect, useState } from "react";
import Card from "../components/card/Card";
import { ICardsData } from "../models";

const BrigadesPage = () => {
    const [filter, setFilter] = useState<number | null>(null);
    const [filteredData, setFilteredData] = useState<ICardsData[]>();    

    const {
        isLoading: brigadesIsLoading,
        data: brigadesData,
        isError: brigadesIsError,
        error: brigadesError,
      } = useGetBrigadesDataQuery();
      
      useEffect(() => {
        if (filter === null) {
          setFilteredData(brigadesData);
          return;
        }
        setFilteredData(brigadesData?.filter(item => item.department.id === filter));
      }, [filter, brigadesData])

      const {
        isLoading: departmentIsLoading,
        data: departmentData,
        isError: departmentIsError
      } = useGetDepartmentsQuery();
    
      const {
        isLoading: connectionStateIsLoading,
        data: connectionStateData,
        isError: connectionStateIsError
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
    
      if (brigadesIsLoading) return <h3 style={{textAlign: 'center'}}>Идет загрузка данных...</h3>;
      if (brigadesIsError) console.error(brigadesError);
      
      return (
        <>         
          {brigadesIsError && (
            <Alert type="error" message="Произошла ошибка при загрузке занных" />
          )}
          <div>
            {departmentData?.map((item) => <Button key={item.id} onClick={()=>setFilter(item.id)}>{item.name}</Button>)}
            <Button onClick={()=>setFilter(null)}>Все</Button>
          </div>
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
            dataSource={filteredData}
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
                  connection={connectionStateIsError ? 'Ошибка загрузки' : connectionStateIsLoading ? 'Загрузка данных' : connection ? connection[connectionStateId] : 'Нет данных с сервера'}
                  department={departmentIsError ? 'Ошибка загрузки' : departmentIsLoading ? 'Загрузка данных' : dep ? dep[department.id] : 'Нет данных с сервера'}
                  field={position.field}
                  well={position.well}
                ></Card>
              </List.Item>
            )}
          ></List>
        </>
      );
}

export default BrigadesPage