export type NormanOverviewSection = {
  /** Omit for a lead block with no subheading */
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
  paragraphsAfterBullets?: string[];
};

export type NormanOverviewBundle = {
  title: string;
  subtitle: string;
  sections: NormanOverviewSection[];
};
