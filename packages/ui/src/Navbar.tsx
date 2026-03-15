export function Navbar() {
  return (
    <>
      <div className="flex justify-between bg-gray-300  py-3 border border-purple-900 border-5 rounded-full">
        <div className="flex">
          <div className="flex font-bold text-purple-800 text-3xl pl-5">
            <div className="text-blue-600 text-5xl">t</div>
            <span className="pt-3">hinker..</span>
          </div>
        </div>
        <div className="items-center flex mx-10">
          <div className="text-slate-700 text-xl mx-10 font-bold">Home</div>
          <div className="text-slate-600 text-lg"></div>
        </div>
      </div>
    </>
  );
}
