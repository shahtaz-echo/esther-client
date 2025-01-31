import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (bodyData) => {
        return {
          url: `auth/login`,
          method: "POST",
          body: bodyData,
        };
      },
      invalidatesTags: ["user-details"],
    }),

    userRegister: builder.mutation({
      query: (bodyData) => {
        return {
          url: `auth/register`,
          method: "POST",
          body: bodyData,
        };
      },
      invalidatesTags: ["user-details"],
    }),

    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          url: `auth/forgot-password`,
          method: "POST",
          body: data,
        };
      },
    }),

    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: `auth/reset-password`,
          method: "POST",
          body: data,
        };
      },
    }),

    refreshToken: builder.mutation({
      query: (payload) => {
        return {
          url: `auth/refresh-token`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["user-details", "user-projects", "tests"],
    }),

    userDetails: builder.query({
      query: (accessToken) => {
        return {
          url: `auth/user-details`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        };
      },
      providesTags: ["user-details"],
    }),

    updateUserInfo: builder.mutation({
      query: (payload) => {
        return {
          url: `/auth/user-details/update`,
          method: "PATCH",
          body: payload,
          formData: true,
        };
      },
      invalidatesTags: ["user-details"],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useUserDetailsQuery,
  useUpdateUserInfoMutation,
} = authApiSlice;
