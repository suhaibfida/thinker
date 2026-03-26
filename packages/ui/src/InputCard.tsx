import Button from "./Button";
import Input from "./Input";
import { v4 as uuidv4 } from "uuid";
interface prop {
  width: string;
  height: string;
  setItem: (val: any) => void;
  item: string;
  setTodo: (val: any) => void;
  todo: any;
  input?: string;
  button?: string;
}
export const InputCard = (props: prop) => {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    props.setItem(value);
  }

  function onClick() {
    props.setTodo((prev: []) => [...prev, { id: uuidv4(), text: props.item }]);
    props.setItem("");
  }
  return (
    <>
      <div className="flex justify-center items-end">
        <div
          className={`${props.width} ${props.height} text-center rounded-2xl fixed translate-y-70`}
        >
          <Input onChange={onChange} />

          <Button onClick={onClick} />
        </div>
      </div>
    </>
  );
};
