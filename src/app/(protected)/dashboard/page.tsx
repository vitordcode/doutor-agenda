import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignOutButton } from "./_components/sign-out-button";

export default async function DashboardPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		redirect("/authentication");
	}

	if (!session?.user.clinic) redirect("/clinic-form");

	return (
		<div>
			<h1>{session?.user?.name}</h1>
			<h1>{session?.user?.email}</h1>
			<SignOutButton />
		</div>
	);
}
