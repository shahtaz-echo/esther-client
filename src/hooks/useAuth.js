import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsFetched } from "@/features/auth/authSlice";
import { useUserDetailsQuery } from "@/features/auth/authApiSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector((state) => state.auth);
  const [authChecked, setAuthChecked] = useState(false);

  // Fetch user details only if accessToken exists and user data is missing
  const { data, isSuccess, isLoading } = useUserDetailsQuery(undefined, {
    skip: !accessToken || !!user?._id,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(userDetailsFetched(data?.data || {}));
    }
    setAuthChecked(true); // Mark auth check as complete
  }, [isSuccess, data, dispatch]);

  return { isLoading: isLoading && !user?._id, authChecked };
};

export default useAuth;
