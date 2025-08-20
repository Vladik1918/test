import { Routes } from "../router/router";

export const NotFound = () => {
  return (
    <main className="h-screen bg-black">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="text-center">
          <h3 className="font-bold text-white text-[150px]">404</h3>
          <h4 className="text-white/60 text-2xl">
            Ooops something went wrong...
          </h4>
        </div>
        <a
          className="text-white/60 text-xl mt-10 border border-white/60 px-4 py-2 flex items-center gap-2.5 hover:border-white hover:text-white duration-300 ease-in-out"
          href={Routes.HOME}
        >
          Back to Home
        </a>
      </div>
    </main>
  );
};
