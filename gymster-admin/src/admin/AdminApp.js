import { Navigate, Route, Routes, useNavigation } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Diet from "./pages/diet/Diet";
import Member from "./pages/member/Member";
import Notice from "./pages/notice/Notice";
import Orders from "./pages/orders/Orders";
import Memberships from "./pages/memberships/Memberships";
import Products from "./pages/products/Product";
import Schedule from "./pages/schedule/Schedule";
import Trainer from "./pages/trainer/Trainer";
import AddMember from "./pages/member/AddMember";
import AddTrainer from "./pages/trainer/AddTrainer";
import AddMembership from "./pages/memberships/AddMembership";
import AddProducts from "./pages/products/AddProducts";
import AddNotice from "./pages/notice/AddNotice";
import AddDiet from "./pages/diet/AddDiet";
import AddSchedule from "./pages/schedule/AddSchedule";
import TrainerDashboard from "./pages/trainer-dashboard/TrainerDashboard";
import RequireAuth from "./utils/RequireAuth";
import EditDiet from "./components/modals/diet/EditDiet";
import EditSchedule from "./components/modals/schedule/EditSchedule";
import EditMembership from "./components/modals/membership/EditMembership";
import EditMember from "./components/modals/member/EditMember";
import EditTrainer from "./components/modals/trainer/EditTrainer";
import EditProduct from "./components/modals/product/EditProduct";
import ViewOrders from "./components/modals/orders/ViewOrders";
import ViewProduct from "./components/modals/product/ViewProduct";
import ViewTrainer from "./components/modals/trainer/ViewTrainer";
import ViewMember from "./components/modals/member/ViewMember";
import RenewMembership from "./components/modals/member/RenewMembership";
import Message from "./pages/message/Message";

export default function AdminApp() {
    return (
        <>
            <Routes>
                <Route element={<RequireAuth allowedRole={['admin']} />}>
                    <Route path="/admin-dashboard" element={<Dashboard />} />

                    <Route path="/admin-add-member" element={<AddMember />} />
                    <Route path="/admin-trainer" element={<Trainer />} >
                        <Route path="edit-trainer/:id" element={<EditTrainer />} />
                        <Route path="view-trainer/:id" element={<ViewTrainer />} />
                    </Route>
                    <Route path="/admin-add-trainer" element={<AddTrainer />} />

                    <Route path="/admin-memberships" element={<Memberships />} >
                        <Route path="edit-membership/:id" element={<EditMembership />} />
                    </Route>

                    <Route path="/admin-add-membership" element={<AddMembership />} />
                    <Route path="/admin-orders" element={<Orders />} >
                        <Route path="view-order/:id" element={<ViewOrders />} />
                    </Route>

                    <Route path="/admin-products" element={<Products />} >
                        <Route path="edit-product/:id" element={<EditProduct />} />
                        <Route path="view-product/:id" element={<ViewProduct />} />
                    </Route>

                    <Route path="/admin-add-products" element={<AddProducts />} />
                    <Route path="/admin-notice" element={<Notice />} />
                    <Route path="/admin-add-notice" element={<AddNotice />} />

                    <Route path="/admin-message" element={<Message />} />
                </Route>

                <Route element={<RequireAuth allowedRole={['gym_trainer']} />}>
                    <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
                </Route>

                <Route element={<RequireAuth allowedRole={['admin', 'gym_trainer']} />} >
                    <Route path="/admin-member" element={<Member />}>
                        <Route path="edit-member/:id" element={<EditMember />} />
                        <Route path="view-member/:id" element={<ViewMember />} />
                        <Route path="renew/:id" element={<RenewMembership />} />
                    </Route>
                    <Route path="/diet" element={<Diet />} >
                        <Route path="edit/:id" element={<EditDiet />} />
                    </Route>
                    <Route path="/add-diet" element={<AddDiet />} />

                    <Route path="/schedule" element={<Schedule />}>
                        <Route path="edit-schedule/:id" element={<EditSchedule />} />
                    </Route>
                    <Route path="/add-schedule" element={<AddSchedule />} />
                </Route>

                {/* <Route path="*" element={} /> */}
            </Routes>
        </>
    )
}