import { Priority } from "@gtd/shared'";

export enum ItemType {
    INBOX = "inbox",
    ACTION = "action",
    PROJECT = "project",
    SOMEDAY = "someday",
    REFERENCE = "reference",
  }
  
  export interface KabanItem {
      id: string;
      title: string;
      priority?: Priority | null;
      date?: string | null;
      isNew?: boolean;
      type: ItemType;
  }