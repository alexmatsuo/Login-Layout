import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./user";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1 className="text-3xl flex justify-between">
        Home
        <Button>
          <Link href={"./auth/login"}>Login</Link>
        </Button>
      </h1>
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
      <User></User>
    </div>
  );
}
