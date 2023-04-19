enum Gender {
  MALE,
  FEMALE,
}
export class Student {
  id: number;
  name: string;
  department: string;
  birthDate: Date | String;
  gender: Gender;

  constructor(
    name: string,
    department: string,
    birthDate: Date | String,
    gender: Gender
  ) {
    this.id = 0;
    this.name = name;
    this.department = department;
    this.birthDate = birthDate;
    this.gender = gender;
  }
}
