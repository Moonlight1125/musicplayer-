import Image from "next/image";
import { getAllMusics } from "@/lib/MicroCMS/client";
import Listen from "@/components/sourceCode/Listen";

export default async function Home() {
  const {contents} = await getAllMusics();
  console.log(contents)
  return (
    <div >
      <Listen items={contents}/>
    </div>
  );
}
