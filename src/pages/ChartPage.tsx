import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useGetPointsFastQuery } from "../store/api/cardInfoQuery";
import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";

export const ChartPage = () => {
  const [numberOfPoints, setNumberOfPoints] = useState(1000);
  const [currentValue, setCurrentValue] = useState(1000);
  const [pointsForChart, setPointsForChart] = useState<number[]>([]);
  const { data: pointsData, isLoading: pointsIsLoading } =
    useGetPointsFastQuery(numberOfPoints);

  useEffect(() => {
    const a = pointsData?.map((point) => point.y) || [];
    setPointsForChart(a);
  }, [pointsData]);

  const setPointsHandler = (points: number) => {
    if (points > 1000000) {
      setCurrentValue(1000000);
      return;
    }
    if (points < 0) {
      setCurrentValue(0);
      return;
    }
    setCurrentValue(points);
  };

  const getPointsHandler = (points: number = 1000) => {
    if (points > 1000000) {
      setNumberOfPoints(1000000);
      return;
    }
    if (points < 0) {
      setNumberOfPoints(0);
      return;
    }
    setNumberOfPoints(points);
  };

  const chartOptions: Highcharts.Options = {
    boost: {
        allowForce: true,
        enabled: true
    },
    title: {
      text: "График",
    },
    series: [
      {
        type: "line",
        step: "left",
        data: pointsForChart,
      },
    ],
    tooltip: {
        animation: false,
    },
    chart: {
        animation: false,
    }
  };
  if(pointsIsLoading) {
    return <h3 style={{textAlign: 'center'}}>Данные загружаются</h3>
  }
  return (
    <div>
      <Form layout="inline">
        <Form.Item<number> label="Количество точек">
          <Input
            type="number"
            value={currentValue}
            onChange={(event) => setPointsHandler(+event.target.value)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={() => getPointsHandler(currentValue)}>
            Получить точки
          </Button>
        </Form.Item>
      </Form>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};
