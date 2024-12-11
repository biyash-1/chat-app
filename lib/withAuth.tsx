import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useEffect, FC } from "react";

const withAuth = <P extends object>(WrappedComponent: FC<P>): FC<P> => {
  const AuthComponent: FC<P> = (props) => {
    const { authUser } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      if (!authUser) {
        router.push("/login");
      }
    }, [authUser, router]);

    // Optionally, you can return a loading state here
    if (!authUser) return null;

    // Return WrappedComponent with props passed down
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
