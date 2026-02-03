import FooterClient from "./FooterClient";

type Props = {
  onCheck: () => void;
  status: "correct" | "wrong" | "none" | "completed";
  disabled?: boolean;
  lessonId?: number;
};

export const Footer = (props: Props) => {
  return <FooterClient {...props} />;
};

