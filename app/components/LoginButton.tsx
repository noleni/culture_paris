import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button onClick={() => signIn('google', {
      callbackUrl: '/dashboard'
    })}>
          Se connecter avec Google
        </button>
      ) : (
        <div>
          <p>Connecté en tant que {session.user?.name}</p>
          <button onClick={() => signOut()}>Se déconnecter</button>
        </div>
      )}
    </div>
  );
}
