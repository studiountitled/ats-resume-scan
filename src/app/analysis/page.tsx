"use client";

import { redirect } from "next/navigation";
import { useAnalysisContext } from "../context/analysisContext";
import { useEffect } from "react";
import Loading from "../components/Loading";
import Link from "next/link";
import Head from "next/head";
// import * as data from "@/src/app/utils/test.json";

const AnalysisPage = () => {
  const { data, isLoading } = useAnalysisContext();

  useEffect(() => {
    if (!data && !isLoading) redirect("/");
  }, [data, isLoading]);

  if (!data) return <Loading showText={false} />;

  const showScore = (score: number): string => {
    if (score >= 85) return "success";
    else if (score >= 61 && score <= 84) return "warning";
    else if (score >= 0 && score <= 60) return "error";
    else return "";
  };

  return (
    <>
      <Head>
        <title>Your Resume Analysis</title>
      </Head>
      <div className="analysis">
        <h1 className="analysis-section-header">
          Job Fit Analysis for {data.analysis.job_requirements.job_title}
        </h1>

        <div
          className={`analysis-section analysis-callout ${showScore(
            data.scoring.base_score
          )}`}
        >
          <h2>Matching Score: {data.scoring.base_score}/100</h2>
          <p>Based on your experience, skills and, job requirements</p>
        </div>

        {data.scoring.disqualifiers.length > 0 && (
          <div className="analysis-section analysis-callout error">
            <h2>This seems like a deal breaker</h2>
            <ul>
              {data?.scoring.disqualifiers.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        )}

        {data.analysis.job_requirements.core.length > 0 && (
          <div className="analysis-section">
            <h2>Core Job Requirements</h2>
            <ul>
              {data.analysis.job_requirements.core.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        )}

        {data.analysis.job_requirements.deal_breakers.length > 0 && (
          <div className="analysis-section analysis-callout warning">
            <h2>Potential Deal Breakers</h2>
            <ul>
              {data.analysis.job_requirements.deal_breakers.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        )}

        {data.analysis.gap_matrix.missing.length > 0 && (
          <div className="analysis-section analysis-callout warning ">
            <h2>Skills missing on your Resume</h2>
            <ul>
              {data.analysis.gap_matrix.missing.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        )}

        {data.swot.weaknesses.length > 0 && (
          <div className="analysis-section">
            <h2>Areas for Improvement</h2>
            <ul>
              {data.swot.weaknesses.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        )}

        {data.analysis.gap_matrix.matches.length > 0 && (
          <div className="analysis-section">
            <h2>Your Strengths</h2>
            <ul>
              {data.analysis.gap_matrix.matches.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        )}

        {data.analysis.gap_matrix.transferable_skills.length > 0 && (
          <div className="analysis-section">
            <h2>Transferrable Skills You Can Shine Light On</h2>
            <ul>
              {data.analysis.gap_matrix.transferable_skills.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        )}

        {data.optimization.before_after_samples.length > 0 && (
          <div className="analysis-section analysis-callout info">
            <h2>You can rewrite this Work experience</h2>
            <div className="sub-info warning">
              <h3>Before</h3>
              <ul>
                {data.optimization.before_after_samples.map((i) => (
                  <li key={i.before}>{i.before}</li>
                ))}
              </ul>
            </div>

            <div className="sub-info success">
              <h3>After</h3>
              <ul>
                {data.optimization.before_after_samples.map((i) => (
                  <li key={i.after}>{i.after}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <p className="get-another-analysis">
          <Link href={"/"}>Get another analysis</Link>
        </p>
      </div>
    </>
  );
};

export default AnalysisPage;
