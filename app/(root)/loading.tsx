import { Loader } from "@/components/Loader";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Loader message="loading..."/>
    </div>
  );
}
