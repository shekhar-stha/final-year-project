import { ToastContainer } from "react-toastify";
import AdminApp from "./admin/AdminApp";
import MemberApp from "./member/MemberApp";
import Universal from "./universal/Universal";


function App() {
  return (
    <>
      <ToastContainer />
      <AdminApp />
      <MemberApp />
      <Universal />
    </>
  );
}

export default App;
