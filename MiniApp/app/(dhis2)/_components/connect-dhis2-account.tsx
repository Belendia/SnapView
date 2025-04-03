"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { useTelegramUser } from "@/lib/telegram";
import { createDHIS2Account, getAvailableDHIS2Systems } from "@/actions/dhis2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DHIS2UserSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export function ConnectDHIS2Account() {
  const tgUser = useTelegramUser();
  const [systems, setSystems] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof DHIS2UserSchema>>({
    resolver: zodResolver(DHIS2UserSchema),
    defaultValues: {
      username: "",
      systemId: "",
      password: "",
    },
  });

  useEffect(() => {
    const loadSystems = async () => {
      const systems = await getAvailableDHIS2Systems();
      setSystems(systems);
    };

    loadSystems();
  }, []);

  const onSubmit = async (values: z.infer<typeof DHIS2UserSchema>) => {
    startTransition(() => {
      if (tgUser === null) {
        setError("Telegram user not found");
        return;
      }

      createDHIS2Account({
        ...values,
        telegramId: tgUser.id.toString(),
      }).then((data) => {
        if (data.error) {
          setError(data.error);
        }

        if (data.success) {
          setSuccess(data.success);
        }
      });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect DHIS2 Account</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (invalid) => {
            console.log(tgUser?.id);
            console.log("Invalid submission", invalid);
          })}
        >
          <CardContent className="space-y-4">
            <FormField
              name="systemId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DHIS2 System</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select system..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {systems.map((sys) => (
                        <SelectItem key={sys.id} value={sys.id}>
                          {sys.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Connect
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
