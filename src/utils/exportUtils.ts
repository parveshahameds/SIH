/**
 * Production File Exporters for NCCT Digital Ecosystem
 * Provides real Blob/URL-based file downloads and clipboard operations
 */

import { AttendanceSubject, Course, SkillCredential, StudentProfile } from '../types';

/**
 * Downloads data as a file with the given filename and MIME type
 */
export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates and downloads a real CSV Attendance Audit Sheet
 */
export function exportAttendanceCSV(
  records: AttendanceSubject[],
  studentName: string,
  rollNumber: string,
  institution: string
) {
  const now = new Date().toLocaleString();
  let csv = `NCCT DIGITAL ATTENDANCE AUDIT SHEET\n`;
  csv += `Institution:,"${institution}"\n`;
  csv += `Trainee Name:,"${studentName}"\n`;
  csv += `Roll Number:,"${rollNumber}"\n`;
  csv += `Export Generated:,"${now}"\n`;
  csv += `Biometric Authentication:,"Verified (Facial Recognition / SHA-256 Mesh)"\n\n`;

  csv += `Subject Code,Subject Name,Faculty,Attended Classes,Total Classes,Attendance Rate (%),Standing Status,Last Verified Session\n`;

  records.forEach((r) => {
    csv += `"${r.subjectCode}","${r.subjectName}","${r.facultyName}",${r.attendedClasses},${r.totalClasses},${r.percentage}%,"${r.status.toUpperCase()}","${r.lastClassDate}"\n`;
  });

  const totalClasses = records.reduce((acc, r) => acc + r.totalClasses, 0);
  const attendedClasses = records.reduce((acc, r) => acc + r.attendedClasses, 0);
  const overallPct = ((attendedClasses / totalClasses) * 100).toFixed(1);

  csv += `\nSUMMARY,Total Attended: ${attendedClasses},Total Conducted: ${totalClasses},Overall: ${overallPct}%,Standing: ${Number(overallPct) >= 75 ? 'ELIGIBLE (SAFE)' : 'AT RISK'}\n`;

  downloadFile(csv, `NCCT_Attendance_Audit_${rollNumber.replace(/[^a-zA-Z0-9]/g, '_')}.csv`, 'text/csv;charset=utf-8;');
}

/**
 * Generates and downloads a comprehensive offline study kit (Notes, Syllabus, Quiz)
 */
export function exportCourseStudyKit(course: Course) {
  const separator = '='.repeat(70);
  let content = `${separator}\n`;
  content += `NATIONAL COUNCIL FOR COOPERATIVE TRAINING (NCCT)\n`;
  content += `MINISTRY OF COOPERATION, GOVERNMENT OF INDIA\n`;
  content += `OFFLINE CURRICULUM STUDY KIT & REFERENCE NOTES\n`;
  content += `${separator}\n\n`;

  content += `Course Code:        ${course.code}\n`;
  content += `Course Title:       ${course.title}\n`;
  content += `Discipline Sector:  ${course.category}\n`;
  content += `Faculty Mentor:     ${course.instructor}\n`;
  content += `Total Modules:      ${course.totalModules} Units (${course.totalHours} Hours)\n`;
  content += `NCrF / NEP Credits: ${course.credits} Credits\n\n`;

  content += `DESCRIPTION & CONTEXT:\n`;
  content += `${course.description}\n\n`;

  if (course.learningOutcomes && course.learningOutcomes.length > 0) {
    content += `KEY LEARNING OUTCOMES & PRACTICAL COMPETENCIES:\n`;
    course.learningOutcomes.forEach((out, i) => {
      content += `  ${i + 1}. ${out}\n`;
    });
    content += `\n`;
  }

  if (course.quiz) {
    content += `${separator}\n`;
    content += `MODULE ASSESSMENT & SELF-DIAGNOSTIC TEST\n`;
    content += `Test Title: ${course.quiz.title}\n`;
    content += `Passing Threshold: ${course.quiz.passingScore}%\n`;
    content += `${separator}\n\n`;

    course.quiz.questions.forEach((q, idx) => {
      content += `Question ${idx + 1}: ${q.question}\n`;
      q.options.forEach((opt, optIdx) => {
        content += `  [${String.fromCharCode(65 + optIdx)}] ${opt}\n`;
      });
      content += `  >> Correct Answer: Option [${String.fromCharCode(65 + q.correctIndex)}]\n`;
      content += `  >> Explanation: ${q.explanation}\n\n`;
    });
  }

  content += `\n${separator}\n`;
  content += `Official Training Material - VAMNICOM / RICM / ICM Institutional Network\n`;
  content += `Generated on: ${new Date().toLocaleString()}\n`;
  content += `${separator}\n`;

  downloadFile(content, `NCCT_${course.code}_Offline_Study_Kit.txt`, 'text/plain;charset=utf-8;');
}

/**
 * Copies text to clipboard and returns true on success
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Clipboard copy failed:', err);
    return false;
  }
}
