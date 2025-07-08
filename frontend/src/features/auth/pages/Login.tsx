import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { loginSchema } from "../schemas";
import { login } from "../services/authApi";
import { useAuth } from "../context/AuthContext";

type LoginInput = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  if (user) {
    // If user is already logged in, redirect to home page
    navigate("/");
    return null;
  }

  const onSubmit = async (data: LoginInput) => {
    try {
      const res = await login(data);
      setUser(res.user, res.accessToken);
      toast.success("Login successful!");
      navigate("/");
    } catch (error: any) {
      toast.error(
        error.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm bg-white p-6 rounded shadow"
        >
          <h2 className="text-2xl text-center font-semibold mb-4">Login</h2>
          <div className="mb-4">
            <input
              {...register("email")}
              placeholder="Email"
              className="input w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400"
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="input w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400"
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn p-2 rounded-xl w-full bg-blue-400 hover:bg-blue-500 text-white hover:font-semibold transition-duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
