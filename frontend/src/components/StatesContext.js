import { createContext, useState } from "react";

export const StatesContext = createContext()

export default function StatesProvider(props) {
    const [exams, setExams] = useState([])
    const [allowedtime, setAllowedTime] = useState(3000)
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated"))
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"))
    const [exres, setExres] = useState({"finshed":false, "result": 0, "total": 0})
    const [userid, setUserid] = useState(localStorage.getItem("userid"));
    const [logged ,setLogged] = useState(localStorage.getItem("logged"));
    const [started, setStarted] = useState(localStorage.getItem("started"));
    const [isloading, setIsloading] = useState(localStorage.getItem("isLoading"));
    const [eligble, setEligble] = useState(localStorage.getItem("eligble"));
    const [posts, setPosts] = useState([]);
    const [job, setJob] = useState(0);
    let [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage, setpostsPerPage] = useState(1);
    const[score, setScore] = useState({"score": 0, "total":0});

    const values = {logged, setLogged,
        isloading, setIsloading, eligble, setEligble,
        posts, setPosts,
        job, setJob, currentPage, setCurrentPage, postsPerPage, setpostsPerPage,
        started, setStarted, userid, setUserid,
        exres, setExres,setScore,score,isAuthenticated, setIsAuthenticated, exams,setExams, setIsAdmin,isAdmin,
        allowedtime, setAllowedTime
    }

    return (
        <StatesContext.Provider value={values}>
        {props.children}
        </StatesContext.Provider>
    )
}
