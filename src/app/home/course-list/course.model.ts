export class Course {
  id: number;
  subject: string;
  code: string;
  description: string;

  constructor(subject: string, code: string, description: string) {
    this.id = 0;
    this.subject = subject;
    this.code = code;
    this.description = description;
  }
}
