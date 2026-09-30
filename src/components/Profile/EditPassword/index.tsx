import { useForm } from "react-hook-form";
import styles from "./editPassword.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import type { User } from "../../../types/user";
import { userActions } from "../../../redux/slices/userSlice";
import { authActions } from "../../../redux/slices/authSlice";
import Input from "../../Common/Input";
import Button from "../../Common/Button";

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

  if (!currentUser) {
    return;
  }

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
      <Input
        label="Current Password"
        type="password"
        id="currentPassword"
        {...register("currentPassword")}
        error={errors.currentPassword?.message}
      />

      <Input
        label="New Password"
        type="password"
        id="newPassword"
        {...register("newPassword")}
        error={errors.newPassword?.message}
      />

      <Input
        label="Confirm New Password"
        type="password"
        id="confirmPassword"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <Button type="submit" fullWidth>
        Change Password
      </Button>
    </form>
  );
};

export default EditPassword;
