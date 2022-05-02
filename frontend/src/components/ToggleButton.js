import React, { useState } from "react";
import Switch from "react-switch";

const CheckedIcon = () => (
  <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
    🌜
  </p>
);
const UncheckedIcon = () => (
  <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
    🌞
  </p>
);

function ToggleButton({ onToggle }) {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      onChange={(c) => {
        setChecked(c);
        onToggle();
      }}
      checked={checked}
      checkedIcon={<CheckedIcon />}
      uncheckedIcon={<UncheckedIcon />}
      offColor="#f5f5f5"
      onColor="#262626"
    />
  );
}

export default ToggleButton;
