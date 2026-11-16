import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AppIcon } from "../ui/AppIcon";

export function Arrow({ diagonal = false }) {
  return (
    <AppIcon
      icon={diagonal ? ArrowUpRight : ArrowRight}
      size="md"
      className={diagonal ? "arrow arrow--diagonal" : "arrow"}
    />
  );
}
