import { SignedIn, UserButton, SignInButton, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/MogeToggle";
export default function Home() {
  return (
    <div className="m-2">
      <SignedOut>
        <SignInButton mode="modal"><Button variant={"outline"}>
        Sign In</Button></SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>

      <ModeToggle />
   </div>
  );
}
