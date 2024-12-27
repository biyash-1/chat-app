import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useEffect, FC } from "react";

const withAuth = <P extends object>(WrappedComponent: FC<P>): FC<P> => {
  const AuthComponent: FC<P> = (props) => {
    const { authUser } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      if (authUser === null) {
        router.push("/login");
      }
    }, [authUser, router]); // Make sure to add authUser as a dependency to rerun the effect

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
