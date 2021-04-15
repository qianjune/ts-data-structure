export interface FormItemInterface {
  label: string;
  name: string;
  rules?: any[]; //Rule[];
  type?: "input" | "select" | "date"; //| React.ReactNode;
  customProps?: {
    options?: {
      label: string;
      value: string;
    }[];
    [keyName: string]: any;
  };
}
