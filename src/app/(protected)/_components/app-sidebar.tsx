"use client";
import {
	CalendarDays,
	LayoutDashboard,
	LogOut,
	Stethoscope,
	UserRound,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Menu items.
const items = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "Agendamentos",
		url: "/appointments",
		icon: CalendarDays,
	},
	{
		title: "Médicos",
		url: "/doctors",
		icon: Stethoscope,
	},
	{
		title: "Pacientes",
		url: "/patients",
		icon: UserRound,
	},
];

export function AppSidebar() {
	const router = useRouter();
	const session = authClient.useSession();
	const pathname = usePathname();

	const handleSignOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/authentication");
				},
			},
		});
	};

	return (
		<Sidebar>
			<SidebarHeader className="p-4 border-b">
				<Image
					src="/logo.svg"
					alt="Doutor Agenda logo"
					width={136}
					height={28}
				/>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										className="data-[active=true]:bg-primary-foreground data-[active=true]:text-primary hover:bg-primary-foreground"
										isActive={pathname === item.url}
										asChild
									>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton size="lg">
									<Avatar>
										<AvatarFallback>V</AvatarFallback>
									</Avatar>
									<div>
										<p className="text-sm">
											{session.data?.user?.clinic?.name}
										</p>
										<p className="text-xs text-muted-foreground">
											{session.data?.user?.email}
										</p>
									</div>
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={handleSignOut}>
									<LogOut className="size-4" />
									Sair
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
