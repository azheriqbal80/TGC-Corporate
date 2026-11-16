const ICON_SIZES = Object.freeze({
  sm: 18,
  md: 20,
  lg: 22,
});

export function AppIcon({ icon: Icon, size = "md", label, ...props }) {
  const pixelSize = ICON_SIZES[size] ?? ICON_SIZES.md;

  return (
    <Icon
      {...props}
      size={pixelSize}
      strokeWidth={1}
      absoluteStrokeWidth
      focusable="false"
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  );
}
