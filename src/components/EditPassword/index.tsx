import { useForm } from "react-hook-form";
import styles from "./editPassword.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import type { User } from "../../types/user";
import { userActions } from "../../redux/slices/userSlice";
import { authActions } from "../../redux/slices/authSlice";

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const changePasswordSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

const EditPassword = () => {
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(changePasswordSchema),
  });

  const changePassword = (data: ChangePasswordFormData, currentUser: User) => {
    if (data.currentPassword !== currentUser.password) {
      throw new Error("Current password is incorrect.");
    }

    const updatedUser: User = {
      ...currentUser,
      password: data.newPassword,
    };

    return updatedUser;
  };

  const onSubmit = (data: ChangePasswordFormData) => {
    if (!currentUser) {
      return;
    }

    try {
      const updatedUser = changePassword(data, currentUser);
      dispatch(userActions.updateUser(updatedUser));
      dispatch(authActions.setCurrentUser(updatedUser));
      reset();
      window.alert("Password Changed");
    } catch (error) {
      if (error instanceof Error) {
        setError("currentPassword", {
          type: "manual",
          message: error.message,
        });
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label htmlFor="currentPassword">Current Password</label>
        <input
          id="currentPassword"
          type="password"
          {...register("currentPassword")}
        />
        {errors.currentPassword && (
          <p className={styles.error}>{errors.currentPassword.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="newPassword">New Password</label>
        <input id="newPassword" type="password" {...register("newPassword")} />
        {errors.newPassword && (
          <p className={styles.error}>{errors.newPassword.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword.message}</p>
        )}
      </div>

      <button className={styles.button} type="submit">
        Change Password
      </button>
    </form>
  );
};

export default EditPassword;
