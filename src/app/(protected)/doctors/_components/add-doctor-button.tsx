"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { UpsertDoctorForm } from "./upsert-doctor-form";

export const AddDoctorButton = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<Plus className="size-4" /> Adicionar médico
				</Button>
			</DialogTrigger>
			<UpsertDoctorForm />
		</Dialog>
	);
};
