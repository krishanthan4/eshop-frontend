import UserDashboardWrapper from "@/app/components/UserDashboardWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
return (<div><UserDashboardWrapper>{children}</UserDashboardWrapper></div>);}
