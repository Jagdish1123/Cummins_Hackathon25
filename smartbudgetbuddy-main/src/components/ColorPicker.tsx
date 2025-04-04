
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

const COLORS = [
  "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", 
  "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", 
  "#FFC107", "#FF9800", "#FF5722", "#795548", "#607D8B"
];

export const ColorPicker = ({ color, onChange, className }: ColorPickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          type="button"
          variant="outline" 
          className={cn("w-10 h-10 p-0 rounded-full border-2", className)}
          style={{ backgroundColor: color }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <div className="grid grid-cols-5 gap-2">
          {COLORS.map((c) => (
            <Button
              key={c}
              type="button"
              variant="ghost"
              className={cn(
                "w-10 h-10 p-0 rounded-full",
                color === c && "ring-2 ring-offset-2 ring-offset-background ring-primary"
              )}
              style={{ backgroundColor: c }}
              onClick={() => {
                onChange(c);
                setOpen(false);
              }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
