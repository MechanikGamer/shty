"use client";
import React, { useState } from "react";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import InputComponent from "../../components/InputComponent/InputComponent";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { z } from "zod";

const RegisterPage = () => {
  const t = useTranslations("registerpage");

  const schema = z
    .object({
      email: z
        .string()
        .email(t("errors.invalidEmail"))
        .min(1, t("errors.requiredField")),
      password: z
        .string()
        .min(6, t("errors.shortPassword"))
        .regex(/.*[!-/:-@[-`{-~].*/, t("errors.missingSpecialChar"))
        .regex(/.*[A-Z].*/, t("errors.missingUppercase"))
        .nonempty(t("errors.requiredField")),

      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: t("errors.passwordMismatch"),
    });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    const result = schema.safeParse({ ...formData, [field]: value });
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors[field]?.[0] || "";
      setErrors((prev) => ({ ...prev, [field]: fieldError }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = () => {
    const result = schema.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    console.log("Registration successful:", formData);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <h1 className="font-['Inter'] text-2xl md:text-3xl lg:text-4xl font-bold text-[#c9ced6]">
        {t("title")}
      </h1>
      <Link href="/login">
        <p className="text-md md:text-md lg:text-lg text-[#c9ced6]">
          {t("alreadyHaveAccount")}{" "}
          <span className="ml-3 text-[#144ee3] hover:underline hover:text-[#4CAF50]">
            {t("login")}
          </span>
        </p>
      </Link>

      <div className="flex flex-col items-center gap-4 w-full md:w-full">
        <InputComponent
          label={t("emailLabel")}
          type="email"
          placeholder={t("emailPlaceholder")}
          value={formData.email}
          onChange={(value) => handleChange("email", value)}
          icon={faEnvelope}
          error={errors.email}
          isError={!!errors.email}
        />
        <InputComponent
          label={t("passwordLabel")}
          type="password"
          placeholder={t("passwordPlaceholder")}
          value={formData.password}
          onChange={(value) => handleChange("password", value)}
          icon={faLock}
          error={errors.password}
          isError={!!errors.password}
        />
        <InputComponent
          label={t("confirmPasswordLabel")}
          type="password"
          placeholder={t("confirmPasswordPlaceholder")}
          value={formData.confirmPassword}
          onChange={(value) => handleChange("confirmPassword", value)}
          icon={faLock}
          error={errors.confirmPassword}
          isError={!!errors.confirmPassword}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-[#144ee3] text-xl font-bold text-white px-6 py-3 md:py-4 rounded-lg hover:bg-[#1a5af5] transition-colors duration-200 w-full md:mt-20"
      >
        {t("register")}
      </button>

      <p className="text-xs md:text-[14px] lg:text-lg text-[#c9ced6] mt-4 text-center">
        {t("agreementText")}{" "}
        <a
          href="/terms"
          className="text-[#2A68FF] hover:underline hover:text-[#4CAF50]"
        >
          {t("termsOfService")}
        </a>
        ,{" "}
        <a
          href="/privacy"
          className="text-[#2A68FF] hover:underline hover:text-[#4CAF50]"
        >
          {t("privacyPolicy")}
        </a>{" "}
        {t("and")}{" "}
        <a
          href="/acceptable-use"
          className="text-[#2A68FF] hover:underline hover:text-[#4CAF50]"
        >
          {t("acceptableUsePolicy")}
        </a>
        .
      </p>
    </div>
  );
};

export default RegisterPage;
