export interface ResumeAnalysisData {
  analysis: Analysis;
  swot: SWOT;
  scoring: Scoring;
  optimization: Optimization;
  rewritten_resume: RewrittenResume;
}

export interface Analysis {
  job_requirements: JobRequirements;
  resume_components: ResumeComponents;
  gap_matrix: GapMatrix;
}

export interface JobRequirements {
  job_title: string;
  core: string[];
  deal_breakers: string[];
}

export interface ResumeComponents {
  skills: string[];
  achievements: string[];
  experience: string[];
}

export interface GapMatrix {
  matches: string[];
  partial_matches: string[];
  missing: string[];
  transferable_skills: string[];
}

export interface SWOT {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface Scoring {
  base_score: number;
  breakdown: Breakdown;
  disqualifiers: string[];
}

export interface Breakdown {
  experience: number;
  skills: number;
  education: number;
}

export interface Optimization {
  before_after_samples: BeforeAfterSample[];
  change_log: string[];
}

export interface BeforeAfterSample {
  before: string;
  after: string;
}

export interface RewrittenResume {
  professional_summary: string;
  skills: string[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
}

export interface ResumeExperience {
  title: string;
  company: string;
  location: string;
  time_worked: string;
  responsibilities: string[];
}

export interface ResumeEducation {
  degree: string;
  field_of_study: string;
  institution: string;
  location: string;
  time_attended: string;
}

export interface MyErrorResponse {
  errorMessage: string;
  statusCode: number;
}
