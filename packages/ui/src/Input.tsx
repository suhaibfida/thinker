interface prop {
  onChange: (val: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input = (props: prop) => {
  return (
    <input
      className="w-md bg-gray-200 rounded-full h-12 text-slate-800 p-7 border-4 border-purple-500 leading-loose font-bold text-md outline-none"
      type="text"
      name="input"
      onChange={props.onChange}
      spellCheck={false}
      placeholder="Enter your todo....."
    />
  );
};
export default Input;
