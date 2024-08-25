import { IoIosAddCircle } from "react-icons/io";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16 bg-grey">
      <div className="flex flex-col font-bold bg-background w-[450px] h-auto py-4 md:py-8 px-12 md:px-8 rounded-xl text-24">
        To Do List
        <IoIosAddCircle className="h-16 w-16 text-add text-right" />
      </div>
    </main>
  );
}
