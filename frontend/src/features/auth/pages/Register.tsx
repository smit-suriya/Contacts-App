import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { registerSchema } from "../schemas";
import { registerUser } from "../services/authApi";
import { useAuth } from "../context/AuthContext";

type RegisterInput = z.infer<typeof registerSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate("/");
    return null;
  }

  const onSubmit = async (data: RegisterInput) => {
    try {
      const res = await registerUser(data);
      setUser(res.user, res.accessToken);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Registration failed. Please try again.");
    }
  };

  return (
      <div className="flex items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm bg-white p-6 rounded shadow"
        >
          <h2 className="text-2xl text-center font-semibold mb-4">Register</h2>
          <div className="mb-4">
            <input
              {...register("username")}
              placeholder="Username"
              className="input w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400"
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>
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
            Register
          </button>
        </form>
      </div>
  );
};

export default Register;
