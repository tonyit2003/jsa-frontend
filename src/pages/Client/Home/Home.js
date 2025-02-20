import { useContext } from "react";

import userType from "~/constants/userType";
import { UserContext } from "~/context/UserProvider";
import CandidateHome from "../CandidateHome";
import RecruiterHome from "../RecruiterHome";

function Home() {
    const { auth, setAuth } = useContext(UserContext);

    let HomePage = CandidateHome;

    if (auth.user_type === userType.RECRUITER) {
        HomePage = RecruiterHome;
    }

    return <HomePage />;
}

export default Home;
