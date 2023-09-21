export interface ICardsData {
    id: number;
    brigade_name: string;
    connectionStateId: number;
    department: Department;
    position: Position;
  }
  
  interface Position {
    field: string;
    cluster: number;
    well: number;
  }
  
  interface Department {
    id: number;
  }

  export interface IDepartment {
    id: number;
    name: string;
  }

  export interface IConnectionState {
    connectionStateId: number;
    name: string;
  }

  export interface IPoints {
    x: string;
    y: number;
  }