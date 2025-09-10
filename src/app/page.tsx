import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      Code Guardian - Your Trusted Companion for Secure, Efficient, and High-Quality Code

      <div className="flex flex-col items-center justify-center">
        <Button>
          Get Started
        </Button>
      </div>

    </div>
  );
}
