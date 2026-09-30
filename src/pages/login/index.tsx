import { useForm } from "react-hook-form";
import styles from "./login.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { authActions } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/Common/Card";
import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";

interface LoginFormData {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const loginUser = (data: LoginFormData) => {
    const user = users?.find(
      (user) =>
        user.email.toLowerCase() === data.email.toLowerCase() &&
        user.password === data.password,
    );

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    return user;
  };

  const onSubmit = (data: LoginFormData) => {
    try {
      const user = loginUser(data);
      dispatch(authActions.login(user));
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError("root", {
          type: "manual",
          message: error.message,
        });
      }
    }
  };

  return (
    <div className={styles.page}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <h1>Welcome Back</h1>
          <p>Login to your account</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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

          {errors.root && (
            <p className={styles.formError}>{errors.root.message}</p>
          )}

          <Button type="submit" fullWidth>
            Login
          </Button>
        </form>

        <p className={styles.footer}>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
