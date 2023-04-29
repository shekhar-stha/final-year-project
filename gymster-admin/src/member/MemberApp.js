import { Route, Routes } from "react-router-dom";
import MemberDashboard from "./pages/dashboard/MemberDashboard";
import Diet from "./pages/diet/Diet";
import Schedule from "./pages/schedule/Schedule";
import Status from "./pages/status/Status";
import RequireAuth from "./utils/RequireAuth";


export default function MemberApp() {
    return (
        <>
            <Routes>
                <Route element={<RequireAuth allowedRole="gym_member" />}>
                    <Route path="/member-dashboard" element={<MemberDashboard />} />
                    <Route path="/member-schedule" element={<Schedule />} />
                    <Route path="/member-diet" element={<Diet />} />
                    <Route path="/member-status" element={<Status />} />
                </Route>
            </Routes>
        </>
    )
}