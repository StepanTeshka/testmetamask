import Link from "next/link";
import { formatAddress } from "@/lib/utils";
import Button from "./ui/Button";
import { useDisconnect } from "wagmi";
import { useAccount, useConnect } from "wagmi";
import { metaMask } from "wagmi/connectors";

export const NavBar = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();

  return (
    <nav className="flex items-center justify-between px-6 mx-auto py-7 rounded-xl">
      <Link href="/" className="flex gap-1">
        <p className="text-2xl font-bold text-gray-900">BlockChats</p>
      </Link>
      {isConnected ? (
        <div className="flex gap-2">
          <div className="flex gap-4 px-6 py-2">{formatAddress(address)}</div>
          <Button onClick={() => disconnect()}>disconnect</Button>
        </div>
      ) : (
        <Button
          onClick={() => connect({ connector: metaMask() })}
          variant="primary"
        >
          Connect Wallet
        </Button>
      )}
    </nav>
  );
};

export default NavBar;
