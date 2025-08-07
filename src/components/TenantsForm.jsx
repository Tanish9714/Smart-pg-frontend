import React, { useState, useImperativeHandle, forwardRef, use } from "react";
import axiosInstance from "../api/axiosInstance";
import { useToast } from "./ui/Toast";

const TenantsForm = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    floor: "",
    roomNumber: "",
    phoneNumber: "",
    password: "",
    joinDate: null,
  });

  const { showToast } = useToast();

  const [formErrors, setFormErrors] = useState({});

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (event.target.name === "floor") {
      const numValue = parseInt(value) || 0;
      setFormData({
        ...formData,
        [name]: numValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }

  function validate() {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      errors.email = "Invalid email format.";
    if (!formData.floor) errors.floor = "Floor is required.";
    if (!formData.roomNumber.trim())
      errors.roomNumber = "Room number is required.";
    if (!formData.phoneNumber.trim())
      errors.phoneNumber = "Phone number is required.";
    else if (!/^\d{10}$/.test(formData.phoneNumber))
      errors.phoneNumber = "Phone number must be 10 digits.";
    if (!formData.password.trim()) errors.password = "Password is required.";

    return errors;
  }

  async function submitForm() {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    }

    console.log(formData);

    try {
      const response = await axiosInstance.post("", {
        query: `
    mutation AddTenant($data: TenantInput!) {
      addTenant(data: $data) {
        id
        name
        email
        roomNumber
      }
  }
    `,
        variables: {
          data: formData,
        },
      });

      if (response.data.errors) {
        console.error("GraphQL errors:", response.data.errors);
        return false;
      }

      showToast("Tenant added successfully!", "success");

      console.log(
        "Tenant created successfully:",
        response.data.data.createTenant
      );

      resetForm();
      return true;
    } catch (error) {
      console.error("Error submitting form:", error);
      return false;
    }
  }

  function resetForm() {
    setFormData({
      name: "",
      email: "",
      floor: "",
      roomNumber: "",
      phoneNumber: "",
      password: "",
      joinDate: null,
    });
    setFormErrors({});
  }

  useImperativeHandle(ref, () => ({
    submitForm,
    validate,
    formData,
    formErrors,
    resetForm,
  }));

  const inputClass = (field) =>
    `w-full px-3 py-1 border rounded-md focus:outline-none ${
      formErrors[field]
        ? "border-red-500 focus:border-red-500 border-solid"
        : "border-gray-300 focus:border-blue-500 border-solid"
    }`;

  return (
    <div className="w-full h-full">
      <div className="max-w-2xl bg-white p-6">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={inputClass("name")}
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={inputClass("email")}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          {/* Floor and Room Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Floor
              </label>
              <input
                type="number"
                name="floor"
                value={formData.floor}
                onChange={handleInputChange}
                className={inputClass("floor")}
              />
              {formErrors.floor && (
                <p className="text-red-500 text-sm mt-1">{formErrors.floor}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Number
              </label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleInputChange}
                className={inputClass("roomNumber")}
              />
              {formErrors.roomNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.roomNumber}
                </p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={inputClass("phoneNumber")}
            />
            {formErrors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.phoneNumber}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={inputClass("password")}
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
          </div>

          {/* Joining Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Joining Date
            </label>
            <input
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleInputChange}
              className={inputClass("joinDate")}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default TenantsForm;
