import React, { useState } from "react";
import '../components/homepage.css'; // Import the CSS file where you put the styles

const Homepage = () => {
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [jobs, setJobs] = useState([]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}${month}${day}`;
    };

    const fetchData = async () => {
        try {
            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(endDate);

            const apiUrl = `https://rfrukmmeeb.execute-api.eu-west-1.amazonaws.com/DEV/invoice?invoiceNumber=${search}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Raw data from API:", data);
            console.log(formattedStartDate, formattedEndDate);

            const jobsArray = JSON.parse(data.body) || [];
            setJobs(jobsArray);

        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    const handleDownloadClick = async (s3_object_name) => {
        try {
            window.location.href =  `https://rfrukmmeeb.execute-api.eu-west-1.amazonaws.com/DEV/download?S3_Object_Name=${s3_object_name}`;
            
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };
    

    const handleGoClick = () => {
        fetchData();
    };

    return (
        <div className="parent">
            <div className="childone">
                <div className="search">
                    <input
                        placeholder="Search Invoice Number..."
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="datepicker">
                    <input
                        className="datepickerchild"
                        placeholder="Start Date (YYYY-MM-DD)"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        className="datepickerchild"
                        placeholder="End Date (YYYY-MM-DD)"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button className="searchbtn" type="button" onClick={handleGoClick}>Search</button>
            </div>

            {(jobs.length !== 0 || startDate.length !== 0) && (
                <div className="childtwo">
                    <div className="container">
                        <table className="customers">
                            <thead>
                                <tr>
                                    <th>Invoice Number</th>
                                    <th>Date</th>
                                    <th>Filename</th>
                                    <th>Sender Number</th>
                                    <th>S3 Object Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job, index) => (
                                    <tr key={index}>
                                        <td>{job.Invoice_Number}</td>
                                        <td>{job.Invoice_date}</td>
                                        <td>{job.Filename}</td>
                                        <td>{job.Sender_Number}</td>
                                        <td>{job.S3_Object_Name}</td>
                                        <td>
                                            <div className="button" onClick={() => handleDownloadClick(job.S3_Object_Name)} data-tooltip="Size: 20Mb">
                                                <div className="button-wrapper">
                                                    <div className="text">Download</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="buttonparent">
                <div className="button" onClick={() => { console.log("click on logout"); }} data-tooltip="Size: 20Mb">
                    <div className="button-wrapper">
                        <div className="text">Logout</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
