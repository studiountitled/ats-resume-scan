"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import fileUploadIcon from "@/public/file-upload.svg";
import { MyErrorResponse, ResumeAnalysisData } from "./type";
import { isMyErrorResponse } from "./utils/util";
import { useAnalysisContext } from "./context/analysisContext";
import { useRouter } from "next/navigation";
import Loading from "./components/Loading";
import toast from "react-hot-toast";

export default function ResumeMatch() {
  const router = useRouter();
  const isTypeInResumeSelected = true;

  const [loading, setLoading] = useState(false);

  // const [jobDescription, setJobDescription] = useState("");
  // const [isTypeInResumeSelected, setIsTypeInResumeSelected] = useState(true);
  // const [resumePDFFile, setResumePDFFile] = useState<File | null>(null);

  const textAreaContainerRef = useRef<HTMLDivElement | null>(null);

  const [resume, setResume] = useState("");
  const [showJobDescriptionInput, setShowJobDescriptionInput] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const { handleAnalysis } = useAnalysisContext();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const storedResume = localStorage.getItem("resume");
    const storedJobDescription = localStorage.getItem("jobDescription");

    if (storedResume) setResume(storedResume);
    setPageLoading(false);

    if (storedJobDescription) setJobDescription(storedJobDescription);
  }, [pageLoading]);

  async function analyzeResume() {
    try {
      setLoading(true);
      const response = await fetch("/api/optimize-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription }),
      });

      const data: MyErrorResponse | ResumeAnalysisData = await response.json();

      if (isMyErrorResponse(data)) {
        toast.error(data.errorMessage);
        setLoading(false);
        router.push("/");
        return;
      }

      handleAnalysis(data);
      setLoading(false);
      router.push("/analysis");
    } catch {
      setLoading(false);
    }
  }

  const fileUploadRef = useRef<HTMLInputElement | null>(null);

  const handleResumeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setResume(e.target.value);
    localStorage.setItem("resume", e.target.value);
  };

  const handleJobDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
    localStorage.setItem("jobDescription", e.target.value);
  };

  const handleFocus = () => {
    if (textAreaContainerRef?.current) {
      textAreaContainerRef.current.classList.add("focusInput");
    }
  };

  const handleBlur = () => {
    if (textAreaContainerRef?.current) {
      textAreaContainerRef.current.classList.remove("focusInput");
    }
  };

  if (pageLoading) return <Loading showText={false} />;

  if (loading) return <Loading showText={true} />;
  else
    return (
      <>
        <>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "ATS Resume Scanning",
              provider: {
                "@type": "Organization",
                name: "ATS Resume Scan",
                url: "https://atsresumescan.com",
              },
              description: "Professional ATS resume optimization service",
              areaServed: "Worldwide",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Resume Scanning Services",
              },
            })}
          </script>
        </>

        <div className="hero">
          <div className="hero-intro">
            <h1>Boost Your Resume’s ATS Score & Land Your Dream Job</h1>
            <p>
              Upload Your Resume & Job Description to Get AI-Powered Insights,
              Match Analysis, and a Score
            </p>

            <div className="upload-section">
              {showJobDescriptionInput ? (
                <div className="text-container" ref={textAreaContainerRef}>
                  <label className="text-container-label" htmlFor=""></label>
                  <textarea
                    className="text-container-input"
                    title="Enter the Job Description."
                    rows={7}
                    placeholder="Enter the Job Description."
                    name="job-description"
                    value={jobDescription}
                    onChange={handleJobDescriptionChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  ></textarea>
                </div>
              ) : isTypeInResumeSelected ? (
                <>
                  <div className="text-container" ref={textAreaContainerRef}>
                    <label className="text-container-label" htmlFor=""></label>
                    <textarea
                      className="text-container-input"
                      title="Enter your Resume"
                      rows={6}
                      placeholder="Enter your Resume"
                      name=""
                      id=""
                      value={resume}
                      onChange={handleResumeChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    ></textarea>
                  </div>
                </>
              ) : (
                <div className="upload-container">
                  <div
                    className="upload-box"
                    onClick={() =>
                      fileUploadRef.current && fileUploadRef.current.click()
                    }
                  >
                    <div className="upload-info">
                      <Image
                        className="upload-icon"
                        height={40}
                        width={39}
                        src={fileUploadIcon}
                        alt="File Upload Icon"
                      />
                      <p className="upload-info-cta">
                        <strong>Click to upload Your Resume</strong>
                      </p>
                      <p className="upload-info-file-size">
                        Maximum file size is 10MB
                      </p>
                    </div>
                  </div>
                  <label className="html-label" htmlFor="resume"></label>
                  {/* <input
                ref={fileUploadRef}
                title="Upload Your Resume"
                type="file"
                accept=".pdf, .docx, .doc, .application/msword, .csv, .txt"
                onChange={handleChange}
              /> */}
                </div>
              )}

              {/* {!isTypeInResumeSelected &&
            resumePDFFile &&
            !showJobDescriptionInput && (
              <p className="file-uploaded-info">
                You uploaded: <strong>{resumePDFFile.name}</strong>
              </p>
            )} */}
            </div>

            {/* {!showJobDescriptionInput && (
          <p
            className="choose-text"
            onClick={() => setIsTypeInResumeSelected((prev) => !prev)}
          >
            {isTypeInResumeSelected
              ? "Or Upload your Resume as a file"
              : "Or Enter your Resume Via Text"}
          </p>
        )} */}

            {showJobDescriptionInput && !loading ? (
              <p
                className="choose-text"
                onClick={() => setShowJobDescriptionInput(false)}
              >
                Choose a different resume
              </p>
            ) : (
              <small></small>
            )}

            {showJobDescriptionInput ? (
              <button
                className="btn"
                onClick={analyzeResume}
                disabled={jobDescription.trim().length <= 0 || loading}
              >
                {jobDescription.length === 0
                  ? "Enter the Job Description to Continue"
                  : "Get Your Detailed Analysis"}
              </button>
            ) : (
              <button
                className="btn"
                onClick={() => setShowJobDescriptionInput(true)}
                disabled={resume.trim().length <= 0 || loading}
              >
                {resume.length === 0
                  ? "Please enter your Resume to Continue"
                  : "Click to Add the Job Description"}
              </button>
            )}
          </div>
        </div>
      </>
    );
}
