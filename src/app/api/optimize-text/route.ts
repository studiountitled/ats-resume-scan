import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: Request) => {
  try {
    const { resume, jobDescription } = await req.json();

    const prompt = `  
**Role**: Act as a professional Career Coach specializing in ATS optimization and competitive job markets.  

**Input Context**:  
- **Resume**: ${resume}  
- **Job Description**: ${jobDescription}  

**Objective**:  
Rewrite and enhance the submitted resume to improve **clarity, impact, and ATS compatibility** while maintaining accuracy and relevance to the job.  

---  

### **1️⃣ Requirement Analysis**  
Extract key job requirements:  
- **Core Requirements (5-7 most important)**  
- **Deal-breakers (e.g., 'Must have CPA certification')** 
- **Ignore Driver's License Requirements** Do use Driver's license requirements to Score the Resume 

### **2️⃣ Resume Audit & Extraction**  
Identify key components from the resume:  
- **Technical Skills** (languages, frameworks, tools)  
- **Achievements** (metrics, quantifiable results)  
- **Experience Match** (years of experience vs JD requirements)  
- **Education & Certifications**  

### **3️⃣ Gap Analysis (Resume vs. Job Description)**  
- **Matches**: Exact skills/experience alignment  
- **Partial Matches**: Related but not exact skills  
- **Missing Elements**: Important but absent requirements  
- **Transferable Skills**: Non-matching but relevant experience  

### **4️⃣ Strategic SWOT Analysis**  
- **Strengths**: Direct qualification matches  
- **Weaknesses**: Missing hard requirements  
- **Opportunities**: Transferable skills that could be leveraged  
- **Threats**: Potential deal-breakers (e.g., location constraints)  

### **5️⃣ Resume Scoring (0-100%)**  
- **Base Score** calculated on requirement matches  
- **Bonus Points** for additional qualifications  
- **Penalty** for missing deal-breakers  
- **Transferable Skill Weighting** to adjust for indirect experience  

### **6️⃣ Resume Enhancement**  
Rewrite the submitted resume to make it **stronger, more compelling, and better aligned** with the job description:  
- **Professional Summary** (Refine and integrate key JD terms naturally)  
- **Skills Section** (Optimize with ATS-friendly keywords)  
- **Experience Section** (Enhance descriptions to better match the JD and improve impact. Use quantifiable achievements and relevant complex technologies where necessary.)  

Each **responsibility** under the rewritten_resume work experience section **MUST** be:  
- at least **150 characters**  
- Structured with **title, location, company, time worked, and responsibilities**  

---  
Do not include any text or commentary.  
Do not add \`\`\`json to the start or end of your reply.  

if you cannot parse it for any reason, return a a JSON message with the Reason you could not parse in the errorMessage value
 it so I can notify the end user in this format. keep the message in less than 50 characters
 
Do not add \`\`\`json to the start or end of your reply.  
{
    "errorMessage": "",
    "statusCode" : 400
}

### **💾 Output Format (JSON Response)**  

{  
  "analysis": {  
    "job_requirements": {"job_title": "", "core": [], "deal_breakers": []},  
    "resume_components": {"skills": [], "achievements": [], "experience": []},  
    "gap_matrix": {  
      "matches": [],  
      "partial_matches": [],  
      "missing": [],  
      "transferable_skills": []  
    }  
  },  
  "swot": {  
    "strengths": [],  
    "weaknesses": [],  
    "opportunities": [],  
    "threats": []  
  },  
  "scoring": {  
    "base_score": 0,  
    "breakdown": {"experience": 0, "skills": 0, "education": 0},  
    "disqualifiers": []  
  },  
  "optimization": {  
    "before_after_samples": [],  
    "change_log": []  
  },  
  "rewritten_resume": {  
    "professional_summary": "",  
    "skills": [],  
    "experience": [  
      {  
        "title": "",  
        "company": "",  
        "location": "",  
        "time_worked": "",  
        "responsibilities": [(Each responsibility **MUST** be at least 150 characters)]  
      }  
    ],   
    "education": [
      {  
        "degree": "",  
        "field_of_study": "",  
        "institution": "",  
        "location": "",  
        "time_attended": ""  
      }  
    ]  
  }  
}  
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    const content = response.choices[0].message?.content;
    console.log(content);
    if (!content)
      return NextResponse.json(
        { message: "Something went wrong while getting OpenAI's response" },
        { status: 500 }
      );

    const result = JSON.parse(content);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
