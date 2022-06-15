export class LoadVaccinations {
  static readonly type = "[Vaccinations] LoadVaccinations";
}

export class DeleteVaccination {
  static readonly type = "[Vaccinations] DeleteVaccination";
  constructor(public url: string) {}
}

export class AddVaccination {
  static readonly type = "[Vaccinations] AddVaccination";
  constructor(
    public vaccineUrl: string,
    public numberOfVaccination: number,
    public dateOfVaccination: string
  ) {}
}
