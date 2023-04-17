export class Student {
  id: number;
  name: string;
  department: string;
  birthDate: Date;
  gender: string;

  constructor(
    id: number,
    name: string,
    department: string,
    birthDate: Date,
    gender: string
  ) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.birthDate = birthDate;
    this.gender = gender;
  }
}
