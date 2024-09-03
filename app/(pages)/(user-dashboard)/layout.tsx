import UserDashboardWrapper from "@/app/components/UserDashboardWrapper";

export default function layout({children} : {children : React.ReactNode}) {
  return (
    <div>
       <UserDashboardWrapper>
        {children}
        </UserDashboardWrapper> 
    </div>
  )
}
