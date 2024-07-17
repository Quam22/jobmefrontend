import { createContext, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

export const GlobalContext = createContext();

const AppContext = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [totalJobs, setTotalJobs] = useState("");
  const [jobType, setJobType] = useState("");
  const [mode, setMode] = useState("");
  const [industry, setIndustry] = useState("");
  const resetFilters = () => {
    setJobType("");
    setMode("");
    setIndustry("");
  };

  const updateJobType = (value) => {
    setJobType(value);
  };
  const updateMode = (value) => {
    setMode(value);
  };
  const updateIndustry = (value) => {
    setIndustry(value);
  };

  const url = "https://jobme-quam.onrender.com/api/v1/jobs";
  const GetJobs = async () => {
    setIsLoading(true);
    const { data } = await axios(
      `${url}?page=${page}&jobType=${jobType}&mode=${mode}&industry=${industry}`
    );
    setIsLoading(false);
    setJobs(data.jobs);
    setTotalPages(data.totalPages);
    setTotalJobs(data.totalJobs);
  };

  useEffect(() => {
    GetJobs();
  }, [page, jobType, mode,industry]);
  return (
    <GlobalContext.Provider
      value={{
        jobs,
        isLoading,
        totalPages,
        page,
        setPage,
        totalJobs,
        updateJobType,
        resetFilters,
        updateMode,
        updateIndustry,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
