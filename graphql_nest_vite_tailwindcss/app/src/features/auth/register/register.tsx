import type React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Button, Input, Title } from "@/components";
import { REGISTER_MUTATION } from "./register.slice";
import { RegisterType } from "./register.types";

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>();

  const navigate = useNavigate();
  const [registerUser] = useMutation(REGISTER_MUTATION);

  const onSubmit = async (data: RegisterType) => {
    try {
      await registerUser({ variables: data });
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto shadow-lg p-8 bg-white rounded-lg py-16">
      <Title>Register</Title>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            label="Name"
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500">{errors.name?.message as string}</p>
          )}
        </div>
        <div>
          <Input
            label="Email"
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email?.message as string}</p>
          )}
        </div>
        <div>
          <Input
            label="Password"
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password?.message as string}</p>
          )}
        </div>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;
