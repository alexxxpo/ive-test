export interface ICardsData {
    id: number;
    brigade_name: string;
    connectionStateId: number;
    department: Department;
    position: Position;
  }
  
  export interface Position {
    field: string;
    cluster: number;
    well: number;
  }
  
  export interface Department {
    id: number;
  }