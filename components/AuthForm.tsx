"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === "sign-up"
        ? z.string().min(3, "Name is required")
        : z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(3, "Password is required"),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-in") {
        toast.success("Signed in successfully!");
        router.push("/");
        console.log("Sign In", values);
      } else {
        toast.success("Account created successfully! Please sign in.");
        router.push("/sign-in");
        console.log("Sign Up", values);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong! ${error}`);
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[550px]">
      <div className="flex flex-col gap-6 card py-8 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">Interview Prep</h2>
        </div>
        <h3>Practice Job Interview with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                placeholder="John Doe"
                label="Name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              placeholder="Your email address"
              label="Email"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              placeholder="Your password"
              type="password"
              label="Password"
            />
            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
