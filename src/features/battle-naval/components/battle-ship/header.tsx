import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex h-full items-center justify-between px-8">
      <div className="flex gap-x-2">
        <Image src="/ship.svg" alt="ship" width={18} height={18} />
        <span className="font-bold">BATTLESHIP</span>
      </div>
      <div>
        <div className="flex gap-x-2 cursor-pointer">
            <Image src="/file.svg" alt="file" width={18} height={18} />
            <span className="">Documentation</span>
        </div>
      </div>
    </div>
  );
};
