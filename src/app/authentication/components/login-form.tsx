"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogoIcon } from "@phosphor-icons/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, { message: "E-mail é obrigatório" })
		.email({ message: "E-mail inválido" }),
	password: z
		.string()
		.trim()
		.min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
});

export default function LoginForm() {
	const router = useRouter();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function handleSubmit(values: z.infer<typeof loginSchema>) {
		await authClient.signIn.email(
			{
				email: values.email,
				password: values.password,
			},
			{
				onSuccess: () => {
					toast.success("Login efetuado com sucesso!");

					router.push("/dashboard");
				},
				onError: () => {
					toast.error("E-mail ou senha inválidos");
				},
			},
		);
	}

	async function handleGoogleLogin() {
		await authClient.signIn.social({
			provider: "google",
			callbackURL: "/dashboard",
		});
	}

	return (
		<Card>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
					<CardHeader>
						<CardTitle>Login</CardTitle>
						<CardDescription>Faça login para continuar.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input type="email" placeholder="jhon@doe.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Digite sua senha"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className="flex flex-col space-y-2">
						<Button
							type="submit"
							className="w-full cursor-pointer"
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting ? (
								<Loader2 className="size-4 animate-spin" />
							) : (
								"Entrar"
							)}
						</Button>
						<Button
							type="button"
							onClick={handleGoogleLogin}
							variant="outline"
							className="w-full cursor-pointer"
						>
							<GoogleLogoIcon weight="bold" size={32} />
							Entrar com Google
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
