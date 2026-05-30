'use client';
export function CustomCursor() {
  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing">
        <span className="cursor-label" id="cursorLabel" />
      </div>
    </>
  );
}
