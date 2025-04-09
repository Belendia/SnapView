import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z.object({
  name: z.string().min(3, "Name is required"),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
});

export const TelegramUserSchema = z.object({
  telegramId: z.string().min(1),
  username: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const CreateDHIS2UserSchema = z.object({
  telegramId: z.string().optional(),
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  systemId: z.string().min(1, {
    message: "System is required",
  }),
});

export const UpdateDHIS2UserSchema = z.object({
  id: z.string().min(1),
  telegramId: z.string().optional(),
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  systemId: z.string().min(1, {
    message: "System is required",
  }),
});

export const PasscodeSchema = z.object({
  telegramId: z.string().optional(),
  passcode: z
    .string()
    .length(6, "Passcode must be 6 digits")
    .regex(/^\d{6}$/, "Only numeric passcodes are allowed"),
});
