"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTelegramUser } from "@/lib/telegram";
import { Loader2 } from "lucide-react";

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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { CreateDHIS2UserSchema, UpdateDHIS2UserSchema } from "@/schemas";

import {
  createDHIS2Account,
  updateDHIS2Account,
  getAvailableDHIS2Systems,
} from "@/actions/dhis2";

type Props = {
  account?: {
    id: string;
    systemId: string;
    username: string;
    password?: string;
  };
};

export function ConnectDHIS2Account({ account }: Props) {
  const router = useRouter();
  const tgUser = useTelegramUser();
  const [systems, setSystems] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const isEdit = !!account;

  const formSchema = isEdit ? UpdateDHIS2UserSchema : CreateDHIS2UserSchema;

  type FormValues = z.infer<typeof CreateDHIS2UserSchema> &
    Partial<z.infer<typeof UpdateDHIS2UserSchema>>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(isEdit ? { id: account?.id } : {}),
      systemId: account?.systemId ?? "",
      username: account?.username ?? "",
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

  const onSubmit = (values: FormValues) => {
    setError(undefined);

    if (!tgUser) {
      setError("Telegram user not found");
      return;
    }

    const payload = {
      ...values,
      telegramId: tgUser.id.toString(),
      ...(isEdit && { id: account!.id }),
    };

    console.log(payload);

    startTransition(() => {
      const action = isEdit
        ? updateDHIS2Account(payload as z.infer<typeof UpdateDHIS2UserSchema>)
        : createDHIS2Account(payload as z.infer<typeof CreateDHIS2UserSchema>);

      action.then((data) => {
        if (data?.error) {
          setError(data.error);
        } else if (data?.success) {
          router.push(
            `/linked-accounts?success=${encodeURIComponent(data.success)}`
          );
        }
      });
    });
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push("/linked-accounts")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Linked Accounts
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>
            {isEdit ? "Edit DHIS2 Account" : "Connect DHIS2 Account"}
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (invalid) => {
              console.warn("Validation failed:", invalid);
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
            <CardFooter className="flex flex-col space-y-2">
              <FormError message={error} />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {isEdit ? "Updating..." : "Connecting..."}
                  </>
                ) : isEdit ? (
                  "Update Account"
                ) : (
                  "Connect Account"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
