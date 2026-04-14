import { Navbar } from "@repo/ui/Navbar";
// import Card from "@repo/ui/Card";
// import { InputCard } from "@repo/ui/InputCard";

// import { useState } from "react";
function App() {
  // const [item, setItem] = useState<string>("");
  // const [todo, setTodo] = useState<{ id: string; text: any }[]>([]);
  return (
    <>
      <div
        className={`bg-[url('./images/background.png')] bg-cover h-screen bg-center p-1 bg-slate-900`}
      >
        <Navbar />
        {/* <Card
          width={"w-2xl"}
          height={"min-h-[60vh]"}
          // todo={todo}
          // setTodo={setTodo}
        /> */}
        <div className="mt-70">
          {/* <InputCard
            width={"w-4xl"}
            height={"h-10"}
            item={item}
            setItem={setItem}
            setTodo={setTodo}
            todo={todo}
          /> */}
        </div>
      </div>
    </>
  );
}

export default App;
