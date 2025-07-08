import { toast } from "react-toastify";
import { z } from "zod";
import { createContact } from "../../auth/services/contactApi";
import { contactSchema } from "../../auth/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

type ContactInput = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: ContactInput) => {
    try {
      const res = await createContact(data);
      if (res.newContact) {
        toast.success("Contact added successfully!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to add contact. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl text-center font-semibold mb-4">
          Add New Contact
        </h2>
        <div className="mb-4">
          <input
            {...register("name")}
            placeholder="Name"
            className="input w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400"
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
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
            {...register("phone")}
            placeholder="Phone"
            className="input w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400"
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>
        <button
          type="submit"
          className="btn p-2 rounded-xl w-full bg-blue-400 hover:bg-blue-500 text-white hover:font-semibold transition-duration-300"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
