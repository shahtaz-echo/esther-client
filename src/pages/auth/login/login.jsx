import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

// hooks
import { useUserLoginMutation } from "@/features/auth/authApiSlice";
import { userLoggedIn } from "@/features/auth/authSlice";

// components
import AuthLayout from "../index";
import TextInput from "@/components/custom-ui/text-input";
import Checkbox from "@/components/custom-ui/checkbox";
import SubmitButton from "@/components/buttons/submit-button";

// icons
import { MdLockOutline, MdOutlineMailOutline } from "react-icons/md";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const from = location.state?.from?.pathname || "/";
  const [rememberMe, setRememberMe] = useState(false);
  const [userLogin, { isLoading }] = useUserLoginMutation();

  const onSubmit = async (data) => {
    const res = await userLogin({ ...data });

    if (res && res.data?.success) {
      toast.success(res.data?.message || "Login successful!");
      const payload = {
        accessToken: res?.data?.data?.accessToken,
        refreshToken: res?.data?.data?.refreshToken,
        rememberMe,
      };
      dispatch(userLoggedIn(payload));
      navigate(from, { replace: true });
    } else {
      toast.error(res.error?.data?.message || "Login Failed!");
    }
  };

  return (
    <AuthLayout title="Login" text="Please Login with your email and password">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          type="email"
          placeholder="Enter your Email"
          icon={MdOutlineMailOutline}
          register={register}
          errors={errors}
          name="email"
          patternValue={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
          requiredMessage="Email is required"
          errorMessage="Invalid email format"
        />
        <TextInput
          type="password"
          placeholder="Enter your password"
          icon={MdLockOutline}
          register={register}
          errors={errors}
          name="password"
          lengthValue={6}
          requiredMessage="Password is required"
          errorMessage="Password must be at least 6 characters"
        />

        <div className="flex justify-between items-center text-xs my-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              label="Remember Me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </div>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <SubmitButton
          className="py-3 w-full"
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Sign In
        </SubmitButton>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
