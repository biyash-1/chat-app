import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useEffect, FC } from "react";


const withAuth = <P extends object>(WrappedComponent: FC<P>): FC<P> => {
  const AuthComponent: FC<P> = (props) => {
    const { authUser,checkAuth } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      if (!checkAuth) {
console.log("WithAuth - Current state:", { authUser });
        router.push("/login");
      }
    }, [authUser, router]);

    
    
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;