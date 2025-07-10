import type { Priority } from "@gtd/shared/api/generated";

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

export enum ElementType {
    Action = "action",
    Project = "project",
    Reference = "reference",
    Someday = "someday",
    Inbox = "inbox",
}

