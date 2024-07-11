import { redirect } from "next/navigation";

export default async function Home(props: any) {
  //redirect("/pages/admin");
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        Hello World !!!
      </div>
    );
}
