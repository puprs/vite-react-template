import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type difficultyFilterProps = {
  onSelect: (tier: string) => void;
};

export const DifficultyFilter = ({ onSelect }: difficultyFilterProps) => {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select difficulty" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All</SelectItem>
        <SelectItem value="Easy">Easy</SelectItem>
        <SelectItem value="Medium">Medium</SelectItem>
        <SelectItem value="Hard">Hard</SelectItem>
        <SelectItem value="Master">Master</SelectItem>
        <SelectItem value="Grandmaster">Grandmaster</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DifficultyFilter;
