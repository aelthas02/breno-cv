export interface Education {
  formation: Formation[];
  certificates: Certificate[];
}
export interface Formation {
  title: string;
  skills: string[];
  listContent: [
    {
      item: string;
      subitem: string;
    }
  ];
}
export interface Certificate {
  label: string;
  certificateUrl: string;
}
