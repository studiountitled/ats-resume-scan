import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs"; // Import the worker explicitly
import { MyErrorResponse } from "../type";

// Set the worker path manually
pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(
  new Blob([pdfWorker], { type: "application/javascript" })
);

// export const getTextFromPDF = async (file: File): Promise<string | null> => {
//   try {
//     const arrayBuffer = await file.arrayBuffer();

//     const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

//     let extractedText = "";

//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i);
//       const textContent = await page.getTextContent();

//       extractedText +=
//         textContent.items.map((item: any) => item.str).join(" ") + "\n";
//     }

//     return extractedText;
//   } catch {
//     return null;
//   }
// };

export function isMyErrorResponse(data: unknown): data is MyErrorResponse {
  if (typeof data === "object" && data !== null && "errorMessage" in data) {
    // Use a type assertion with Record<string, unknown> to avoid using 'any'
    const errorObj = data as Record<string, unknown>;
    return typeof errorObj.errorMessage === "string";
  }
  return false;
}
// const handleSubmitWithFileUpload = async () => {
//   try {
//     const formData = new FormData();

//     if (!resumePDFFile) return;

//     formData.append("resume", resumePDFFile);

//     if (resumePDFFile.type === "application/json") {
//     }

//     let res = await fetch("/api/optimize-file", {
//       method: "POST",
//       body: formData,
//     });

//     res = await res.json();

//     console.log("res is ", res);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error(error.message);
//     }
//   }
// };

// const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
//   const files = e.target.files;
//   if (!files?.length) return;

//   const resume = files[0];

//   if (resume.size > 5 * 1024 * 1024) {
//     return alert("File must be less than 5 MB");
//   }

//   setResumePDFFile(files[0]);
// };
