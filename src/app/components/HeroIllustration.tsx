import Dashboard from "@/imports/Dashboard1-1/index";
import "@/imports/Dashboard1-1/styles.css";

export function HeroIllustration() {
  return (
    <div style={{ width: "100%", maxWidth: 580, margin: "0 auto", position: "relative" }}>
      {/*
        Aspect-ratio wrapper — Dashboard1-1 uses percentage-based insets
        designed on a portrait canvas. paddingBottom drives the intrinsic height.
      */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "134.73%" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
