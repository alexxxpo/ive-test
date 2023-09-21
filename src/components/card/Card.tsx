import { Card } from "antd";

interface ICardProps {
    brigade?: string;
    department?: string;
    connection?: string;
    cluster?: number;
    well?: number;
    field?: string;
}

const CardElement: React.FC<ICardProps> = ({ brigade, cluster, connection, department, field, well }) => {
    return (
        <>
            <Card title={brigade}>
                {department}
                <br />
                <br />
                Соединение: {connection}
                <br />
                Кластер: {cluster}
                <br />
                Поле: {field}
                <br />
                Скважина: {well}
            </Card>
        </>
    );
}

export default CardElement;