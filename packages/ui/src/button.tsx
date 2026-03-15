interface prop {
  onClick: any;
}
const Button = (props: prop) => {
  return (
    <>
      <button
        className="rounded-full ml-2 bg-violet-700 border-2   border-purple-500 cursor-pointer px-7 py-[17px] font-bold text-white hover:bg-violet-600 duration-300"
        onClick={props.onClick}
      >
        Add Task
      </button>
    </>
  );
};
export default Button;
