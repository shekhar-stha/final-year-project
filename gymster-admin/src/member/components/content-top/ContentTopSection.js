import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
export default function ContentTopSection() {
    const user = useSelector(state => state?.user?.user)
    const [initials, setInitials] = useState()
    useEffect(() => {
        if (user !== undefined) {
            const name = user?.full_name;
            const words = name?.split(' ');
            // Extract the first character of each word
            if (words !== undefined) {
                const letters = words[0]?.charAt(0) + words[1]?.charAt(0);
                setInitials(letters?.toUpperCase())
            }
        }
    }, []);
    return (
        <>
            <div className="d-flex justify-content-center content-top-section postion-relative">
                <h3 className="fs-20 mx-auto">Gymster - Gym Management System</h3>
                <p className="ms-auto position-absolute fs-14 mt-1 fw-400">{initials}</p>
            </div>
        </>
    )
}