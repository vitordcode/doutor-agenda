import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./components/login-form";
import SignUpForm from "./components/signup-form";

export default function AuthenticationPage() {
	return (
		<div className="flex items-center justify-center h-screen w-full">
			<Tabs defaultValue="login" className="w-[400px]">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="login">Login</TabsTrigger>
					<TabsTrigger value="register">Criar conta</TabsTrigger>
				</TabsList>
				<TabsContent value="login">
					<LoginForm />
				</TabsContent>
				<TabsContent value="register">
					<SignUpForm />
				</TabsContent>
			</Tabs>
		</div>
	);
}
