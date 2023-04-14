import { useCallback, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useDebouncedCallback } from "use-debounce";
import SmoothMount from "./SmoothMount";
import useOnClickOutside from "~/hooks/useOnClickOutside";

const ColorPicker: React.FC<{
  defaultColor?: string;
  onColorSelect: (arg0: string) => void;
}> = ({ defaultColor = "#000000", onColorSelect }) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [color, setColor] = useState(defaultColor);
  const pickerRef = useRef(null);

  const handleColorSelect = (c: string) => {
    setColor(c);
    onColorSelect(c);
  };
  const debouncedColorSelect = useDebouncedCallback(handleColorSelect, 100);
  const closePicker = useCallback(() => setPickerOpen(false), []);
  useOnClickOutside(pickerRef, closePicker);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setPickerOpen(!pickerOpen);
        }}
        className={`h-6 w-6 rounded-md outline outline-1 outline-offset-2 outline-white`}
        style={{ background: color }}
      ></button>
      <div
        className="absolute left-1/2 bottom-10 translate-x-[-50%] rounded-lg"
        ref={pickerRef}
      >
        <SmoothMount show={pickerOpen}>
          <HexColorPicker
            color={color}
            onChange={debouncedColorSelect}
            className="rounded-b-none"
          />
          <HexColorInput
            color={color}
            onChange={debouncedColorSelect}
            className="w-full bg-neutral px-3 py-2"
          />
        </SmoothMount>
      </div>
    </>
  );
};

export default ColorPicker;
