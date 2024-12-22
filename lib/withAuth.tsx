import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useEffect, FC } from "react";

const withAuth = <P extends object>(WrappedComponent: FC<P>): FC<P> => {
  const AuthComponent: FC<P> = (props) => {
    const { authUser, hasHydrated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      if (hasHydrated && authUser === null) {
        router.push("/login");
      }
    }, [authUser, hasHydrated]);

    if (!hasHydrated) {
      return null; // Wait until hydration completes
    }

    if (!authUser) {
      return null; // Prevent rendering until auth is checked
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
