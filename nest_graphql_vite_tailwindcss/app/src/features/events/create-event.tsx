import type React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Button, Input, Title } from "@/components";
import { CREATE_EVENT_MUTATION } from "./events.slice";
import { CreateEventType } from "./events.types";

const CreateEvent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEventType>();

  const [createEvent] = useMutation(CREATE_EVENT_MUTATION);

  const navigate = useNavigate();

  const onSubmit = async (data: CreateEventType) => {
    try {
      const result = await createEvent({ variables: data });
      toast("Created successfully!", {
        type: "success",
      });
      navigate(`/event/${result.data.createEvent._id}`);
    } catch (error) {
      console.error("Create event error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto shadow-lg px-8 bg-white rounded-lg pb-16">
      <Title>Create Event</Title>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            label={"Title"}
            placeholder={""}
            id="title"
            type="text"
            {...register("title", { required: "Title is required" })}
          />

          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
        </div>
        <div>
          <Input
            label={"Description"}
            multiline
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
          />

          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}
        </div>
        <div>
          <Input
            label={"Date"}
            placeholder={""}
            id="date"
            type="datetime-local"
            {...register("date", { required: "Date is required" })}
          />

          {errors.date && (
            <p className="text-red-500 text-xs">{errors.date.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Create Event
        </Button>
      </form>
    </div>
  );
};

export default CreateEvent;
