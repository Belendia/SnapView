import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z.object({
  name: z.string().min(3, "Name is required"),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  // username: z.optional(z.string().min(3)),
  // password: z.optional(z.string().min(6)),
  // newPassword: z.optional(z.string().min(6)),
});
// .refine(
//   (data) => {
//     if (data.password && !data.newPassword) {
//       return false;
//     }

//     return true;
//   },
//   {
//     message: "New password is required!",
//     path: ["newPassword"],
//   }
// )
// .refine(
//   (data) => {
//     if (data.newPassword && !data.password) {
//       return false;
//     }

//     return true;
//   },
//   {
//     message: "Password is required!",
//     path: ["password"],
//   }
// );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  username: z.string().min(3, {
    message: "Username is required",
  }),
});

export const LoginSchema = z.object({
  username: z.string().min(3, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  username: z.string().min(3, {
    message: "Username is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  // name: z.string().min(1, {
  //   message: "Name is required",
  // }),
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
