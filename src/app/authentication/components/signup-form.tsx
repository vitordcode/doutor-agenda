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
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const registerSchema = z.object({
	name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
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

export default function SignUpForm() {
	const router = useRouter();

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof registerSchema>) {
		await authClient.signUp.email(
			{
				email: values.email,
				password: values.password,
				name: values.name,
			},
			{
				onSuccess: () => {
					router.push("/dashboard");
				},
				onError: (ctx) => {
					if (ctx.error.code === "USER_ALREADY_EXISTS") {
						toast.error("E-mail já cadastrado");
						return;
					}
					toast.error("Erro ao criar conta");
				},
			},
		);
	}
	return (
		<Card>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<CardHeader>
						<CardTitle>Criar conta</CardTitle>
						<CardDescription>Crie uma conta para continuar.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input type="text" placeholder="Jhon Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

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
					<CardFooter>
						<Button
							type="submit"
							className="w-full cursor-pointer"
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting ? (
								<Loader2 className="size-4 animate-spin" />
							) : (
								"Criar conta"
							)}
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
