import { Dataset } from "../../interfaces/datasets.interface";
import { FieldNode } from "./FieldNode";
import { RootNode } from "./RootNode";

export class DatasetTree {
  private root: RootNode;

  constructor(name: string, limit: number) {
    this.root = new RootNode(limit, name);
  }

  get name() {
    return this.root.name;
  }

  get limit() {
    return this.root.limit;
  }

  get id() {
    return this.root.id;
  }

  get fields() {
    return this.root.getFields();
  }

  public setLimit(limit: number) {
    this.root.limit = limit;
  }

  public setName(name: string) {
    this.root.name = name;
  }

  public findFieldByID(fieldID: string): FieldNode | null {
    return this.root.findFieldByID(fieldID);
  }

  public getDatasetObject(): Dataset {
    return {
      id: this.id,
      name: this.name,
      fields: this.fields,
      limit: this.limit,
    };
  }

  public setNodeByLocation(
    field: FieldNode | string,
    location: string[]
  ): void {
    if (typeof field === "string") {
      const found = this.findFieldByID(field);
      if (found) this.root.setFieldByLocation(found, location);
    } else this.root.setFieldByLocation(field, location);
  }

  public deleteField(fieldID: string) {
    this.root.deleteField(fieldID);
  }

  public getFieldLocation(fieldID: string): string[] {
    const ret = this.root.getFieldLocation(fieldID, []);

    if (ret) return ret;
    else return [];
  }
}
