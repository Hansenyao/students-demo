import { Save, RotateCcw } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PersonForm = ({ methods, onFormReset, onFormSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const enrolledAt = watch("enrolled_at");

  return (
    <div
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
      style={{ marginBottom: "5px" }}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
        <input type="hidden" {...register("id")} />
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name*
            </label>
            <input
              type="text"
              {...register("name", {
                maxLength: 100,
                required: true,
              })}
              className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
              placeholder="Enter name"
            />

            {errors.name?.type === "required" && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                Name is required
              </p>
            )}

            {errors.name?.type === "maxLength" && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                Name cannot exceed more than 100 characters
              </p>
            )}
          </div>

          <div className="flex-1">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Age
            </label>
            <input
              type="number"
              {...register("age", {
                min: 0,
                max: 120,
              })}
              className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
              placeholder="Enter age"
            />

            {errors.age?.type === "min" && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                Age cannot be less than 0
              </p>
            )}

            {errors.age?.type === "max" && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                Age cannot exceed 120
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Gender*
            </label>
            <select
              {...register("gender", { required: true })}
              className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>

            {errors.gender?.type === "required" && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                Gender is required
              </p>
            )}
          </div>

          <div className="flex-1">
            <label
              htmlFor="enrolled_at"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enrolled At*
            </label>
            <DatePicker
              selected={enrolledAt ? new Date(enrolledAt) : null}
              onChange={(date) =>
                setValue("enrolled_at", date?.toISOString().split("T")[0], {
                  shouldValidate: true,
                })
              }
              dateFormat="yyyy-MM-dd"
              className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
              placeholderText="Select enrollment date"
            />

            {errors.enrolled_at?.type === "required" && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                Enrollment date is required
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Save className="w-4 h-4 mr-2" />
          </button>

          <button
            type="button"
            onClick={onFormReset}
            className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
