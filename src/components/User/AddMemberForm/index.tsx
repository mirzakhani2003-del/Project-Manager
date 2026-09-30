import { useForm } from "react-hook-form";
import styles from "./addMemberForm.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import type { User } from "../../../types/user";
import { v4 as uuid } from "uuid";
import { userActions } from "../../../redux/slices/userSlice";
import Input from "../../Common/Input";
import Button from "../../Common/Button";

interface AddMemberFromData {
  name: string;
  email: string;
  password: string;
}

const addMemberFormSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const AddMemberFrom = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<AddMemberFromData>({
    resolver: yupResolver(addMemberFormSchema),
  });

  if (!currentUser) {
    return;
  }

  const addMember = (data: AddMemberFromData): User => {
    if (currentUser.role !== "manager") {
      throw new Error("Only managers can add team members.");
    }

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === data.email.toLowerCase(),
    );

    if (existingUser) {
      throw new Error("An account with this email already exists.");
    }

    const newMember: User = {
      id: uuid(),
      name: data.name,
      email: data.email.toLowerCase(),
      password: data.password,
      role: "member",
      teamId: currentUser.teamId,
    };

    return newMember;
  };

  const onSubmit = (data: AddMemberFromData) => {
    try {
      const newMember = addMember(data);
      dispatch(userActions.addUser(newMember));
      reset();
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

      <Input
        label="Password"
        type="password"
        id="password"
        {...register("password")}
        error={errors.password?.message}
      />

      <Button type="submit" fullWidth>
        Add Member
      </Button>
    </form>
  );
};

export default AddMemberFrom;
