import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, TextField, Typography } from "../node_modules/@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import apiInstance from "../http_config";
import CommonHoverButton from "./CommonHoverButton";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  emailAddress: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  mobileNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Enter a valid contact number")
    .required("Mobile number is required"),
  details: yup
    .string()
    .test("wordCount", "Maximum 1000 words allowed", (value) => {
      if (!value) return true;
      const wordCount = value.trim().split(/\s+/).length;
      return wordCount <= 1000;
    })
    // .required("Project details are required and must be less than 1000 words"),
});

const ContactUs = ({
  isDataFromProduct,
  productId,
  productName,
  closeModal,
  isDataForCustomisation,
}) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    let finalData = {
      ...data,
      isDataFromProduct: isDataFromProduct,
      productId: productId,
      productName: productName,
      isDataForCustomisation: isDataForCustomisation || false,
    };
    try {
      await apiInstance.post("/publicApi/saveEnquiryData", finalData);
      toast.success("Your enquiry has been submitted successfully!", {
        position: "top-center",
      });
      reset();
      closeModal && closeModal();
    } catch (error) {
      toast.error("Failed to submit enquiry. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      {/* Header */}

      {!closeModal && (
        <div
          className={`flex items-center justify-center w-full ${
            !closeModal && "py - 4"
          }`}
          data-aos="fade-down"
        >
          <div className="flex-grow h-px bg-gray-300"></div>
          <h1 className="px-4 text-2xl text-black font-bold"> Contact Us</h1>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
      )}
      <Container maxWidth="sm" className="py-10">
        {/* Contact Form */}
        <Box data-aos="zoom-in">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
          Luxury is personal. Let’s curate yours.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <TextField
              label="Your Name"
              placeholder="Enter your name"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              fullWidth
              {...register("emailAddress")}
              error={!!errors.emailAddress}
              helperText={errors.emailAddress?.message}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Mobile Number"
              placeholder="Enter your mobile number"
              type="tel"
              fullWidth
              {...register("mobileNumber")}
              error={!!errors.mobileNumber}
              helperText={errors.mobileNumber?.message}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Project Details"
              placeholder="Enter details about your project"
              multiline
              rows={4}
              fullWidth
              {...register("details")}
              error={!!errors.details}
              helperText={errors.details?.message}
              InputLabelProps={{ shrink: true }}
            />

            <Box className="flex justify-center py-2">
              <CommonHoverButton label={"Submit"} />
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default ContactUs;
