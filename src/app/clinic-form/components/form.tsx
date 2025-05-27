"use client";
import { createClinic } from "@/actions/create-clinic";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const clinicFormSchema = z.object({
	name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
});

export default function ClinicForm() {
	const form = useForm<z.infer<typeof clinicFormSchema>>({
		resolver: zodResolver(clinicFormSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof clinicFormSchema>) => {
		try {
			await createClinic(data.name);
		} catch (error) {
			if (isRedirectError(error)) {
				return;
			}
			toast.error("Erro ao criar clínica.");
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					name="name"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<Button
						type="submit"
						className="cursor-pointer"
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							"Criar clínica"
						)}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
