import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import styles from "./editProfile.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { User } from "../../../types/user";
import { userActions } from "../../../redux/slices/userSlice";
import { authActions } from "../../../redux/slices/authSlice";
import Input from "../../Common/Input";
import Button from "../../Common/Button";

interface EditProfileFormData {
  name: string;
  email: string;
}

const editProfileSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
});

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      name: currentUser?.name ?? "",
      email: currentUser?.email ?? "",
    },
  });

  if (!currentUser) {
    return;
  }

  const updateProfile = (data: EditProfileFormData, currentUser: User) => {
    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() === data.email.toLowerCase() &&
        user.id !== currentUser.id,
    );

    if (existingUser) {
      throw new Error("An account with this email already exists.");
    }

    const updatedUser: User = {
      ...currentUser,
      name: data.name,
      email: data.email.toLowerCase(),
    };

    return updatedUser;
  };

  const onSubmit = (data: EditProfileFormData) => {
    try {
      const updatedUser = updateProfile(data, currentUser);
      dispatch(userActions.updateUser(updatedUser));
      dispatch(authActions.setCurrentUser(updatedUser));
      window.alert("Personal Information Changed");
    } catch (error) {
      if (error instanceof Error) {
        setError("email", {
          type: "manual",
          message: error.message,
        });
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        type="text"
        id="name"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        label="Email"
        type="email"
        id="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Button type="submit" fullWidth>
        Save Changes
      </Button>
    </form>
  );
};

export default EditProfile;
