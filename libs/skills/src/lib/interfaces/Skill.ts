export interface Skill {
  type: string;
  icon: string;
  items: string[];
}
export interface SkillResponse {
  type: string;
  icon: string;
  items: { item: string }[];
}
