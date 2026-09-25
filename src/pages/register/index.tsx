import { useForm } from "react-hook-form";
import styles from "./register.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { User } from "../../types/user";
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { userActions } from "../../redux/slices/userSlice";
import type { Team } from "../../types/team";
import { teamsActions } from "../../redux/slices/teamSlice";
import { authActions } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const registerSchema = yup.object({
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
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const RegisterUser = (data: RegisterFormData) => {
    const existingUser = users?.find(
      (user) =>
        user.email.toLocaleLowerCase() === data.email.toLocaleLowerCase(),
    );

    if (existingUser) {
      throw new Error("An account with this email already exists.");
    }

    const userId = uuid();
    const teamId = uuid();

    const newUser: User = {
      id: userId,
      name: data.name,
      email: data.email.toLowerCase(),
      password: data.password,
      role: "manager",
      teamId: teamId,
    };

    const newTeam: Team = {
      id: teamId,
      name: `${data.name}'s Team`,
      ownerId: userId,
    };

    return {
      newUser,
      newTeam,
    };
  };

  const onSubmit = (data: RegisterFormData) => {
    try {
      const { newUser, newTeam } = RegisterUser(data);
      dispatch(userActions.addUser(newUser));
      dispatch(teamsActions.addTeam(newTeam));
      dispatch(authActions.login(newUser));
      navigate("/dashboard");
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
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Create Account</h1>
          <p>Create your team workspace</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" {...register("name")} />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register("email")} />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register("password")} />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword.message}</p>
            )}
          </div>

          <button className={styles.submitButton} type="submit">
            Register
          </button>
        </form>

        <p className={styles.footer}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
