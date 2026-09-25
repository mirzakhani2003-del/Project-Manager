import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styles from "./editProfile.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { User } from "../../types/user";
import { userActions } from "../../redux/slices/userSlice";
import { authActions } from "../../redux/slices/authSlice";

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
    if (!currentUser) {
      return;
    }

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
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" {...register("name")} />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register("email")} />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <button className={styles.button} type="submit">
        Save Changes
      </button>
    </form>
  );
};

export default EditProfile;
