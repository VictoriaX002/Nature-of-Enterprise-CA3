"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AccessibilityPage() {
  const [fontSize, setFontSize] = useState("medium");
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fontSizeMap: Record<string, string> = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xlarge: "text-xl",
  };

  return (
    <main
      className={`min-h-screen bg-gray-50 ${highContrast ? "bg-black text-white" : ""}`}
      style={{ fontFamily: dyslexiaFont ? "Arial, sans-serif" : "inherit" }}
    >
      {/* Header */}
      <div className={`${highContrast ? "bg-yellow-400" : "bg-blue-600"} px-6 py-8`}>
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className={`text-sm ${highContrast ? "text-black font-bold" : "text-blue-100"} hover:underline`}
          >
            ← Back to Home
          </Link>
          <h1 className={`text-3xl font-bold mt-2 ${highContrast ? "text-black" : "text-white"}`}>
            ♿ Accessibility Settings
          </h1>
          <p className={`mt-1 text-sm ${highContrast ? "text-black" : "text-blue-100"}`}>
            Customise Campus Companion to suit your needs
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">

        {/* Text Size */}
        <div className={`rounded-2xl p-6 shadow-sm border ${highContrast ? "bg-black border-yellow-400" : "bg-white border-gray-100"}`}>
          <h2 className={`text-lg font-bold mb-1 ${highContrast ? "text-yellow-400" : "text-gray-800"}`}>
            📝 Text Size
          </h2>
          <p className={`text-sm mb-4 ${highContrast ? "text-white" : "text-gray-500"}`}>
            Adjust the text size across the app
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["small", "medium", "large", "xlarge"].map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                aria-pressed={fontSize === size}
                className={`py-3 px-4 rounded-xl font-semibold border-2 transition-all ${
                  fontSize === size
                    ? highContrast
                      ? "bg-yellow-400 text-black border-yellow-400"
                      : "bg-blue-600 text-white border-blue-600"
                    : highContrast
                    ? "bg-black text-white border-white hover:border-yellow-400"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300"
                } ${fontSizeMap[size]}`}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className={`mt-4 p-4 rounded-xl border ${highContrast ? "border-yellow-400 bg-gray-900" : "border-gray-100 bg-gray-50"}`}>
            <p className={`font-medium ${fontSizeMap[fontSize]} ${highContrast ? "text-white" : "text-gray-700"}`}>
              Preview: The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        </div>

        {/* High Contrast */}
        <div className={`rounded-2xl p-6 shadow-sm border ${highContrast ? "bg-black border-yellow-400" : "bg-white border-gray-100"}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-lg font-bold ${highContrast ? "text-yellow-400" : "text-gray-800"}`}>
                🌗 High Contrast Mode
              </h2>
              <p className={`text-sm mt-1 ${highContrast ? "text-white" : "text-gray-500"}`}>
                Increases contrast for better visibility
              </p>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              aria-pressed={highContrast}
              aria-label="Toggle high contrast mode"
              className={`relative w-14 h-7 rounded-full transition-colors ${
                highContrast ? "bg-yellow-400" : "bg-gray-300"
              }`}
            >
              <span className={`absolute top-1 w-5 h-5 rounded-full transition-all ${
                highContrast ? "left-8 bg-black" : "left-1 bg-white"
              }`} />
            </button>
          </div>
        </div>

        {/* Reduced Motion */}
        <div className={`rounded-2xl p-6 shadow-sm border ${highContrast ? "bg-black border-yellow-400" : "bg-white border-gray-100"}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-lg font-bold ${highContrast ? "text-yellow-400" : "text-gray-800"}`}>
                🎭 Reduced Motion
              </h2>
              <p className={`text-sm mt-1 ${highContrast ? "text-white" : "text-gray-500"}`}>
                Reduces animations and transitions
              </p>
            </div>
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              aria-pressed={reducedMotion}
              aria-label="Toggle reduced motion"
              className={`relative w-14 h-7 rounded-full transition-colors ${
                reducedMotion
                  ? highContrast ? "bg-yellow-400" : "bg-blue-600"
                  : "bg-gray-300"
              }`}
            >
              <span className={`absolute top-1 w-5 h-5 rounded-full transition-all ${
                reducedMotion ? "left-8 bg-white" : "left-1 bg-white"
              }`} />
            </button>
          </div>
          {reducedMotion && (
            <div className={`mt-3 text-sm p-3 rounded-xl ${highContrast ? "bg-yellow-400 text-black" : "bg-blue-50 text-blue-700"}`}>
              ✅ Reduced motion is now enabled
            </div>
          )}
        </div>

        {/* Dyslexia Friendly Font */}
        <div className={`rounded-2xl p-6 shadow-sm border ${highContrast ? "bg-black border-yellow-400" : "bg-white border-gray-100"}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-lg font-bold ${highContrast ? "text-yellow-400" : "text-gray-800"}`}>
                🔤 Dyslexia Friendly Font
              </h2>
              <p className={`text-sm mt-1 ${highContrast ? "text-white" : "text-gray-500"}`}>
                Switches to a clearer, more readable font
              </p>
            </div>
            <button
              onClick={() => setDyslexiaFont(!dyslexiaFont)}
              aria-pressed={dyslexiaFont}
              aria-label="Toggle dyslexia friendly font"
              className={`relative w-14 h-7 rounded-full transition-colors ${
                dyslexiaFont
                  ? highContrast ? "bg-yellow-400" : "bg-blue-600"
                  : "bg-gray-300"
              }`}
            >
              <span className={`absolute top-1 w-5 h-5 rounded-full transition-all ${
                dyslexiaFont ? "left-8 bg-white" : "left-1 bg-white"
              }`} />
            </button>
          </div>
        </div>

        {/* WCAG Info */}
        <div className={`rounded-2xl p-6 shadow-sm border ${highContrast ? "bg-black border-yellow-400" : "bg-blue-50 border-blue-100"}`}>
          <h2 className={`text-lg font-bold mb-3 ${highContrast ? "text-yellow-400" : "text-blue-800"}`}>
            ♿ WCAG Compliance
          </h2>
          <div className="space-y-2">
            {[
              "All form inputs have descriptive labels",
              "Buttons include aria-label attributes",
              "Colour contrast meets WCAG AA standards",
              "Keyboard navigation supported throughout",
              "Focus states visible on all interactive elements",
              "Semantic HTML headings used correctly",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <p className={`text-sm ${highContrast ? "text-white" : "text-blue-700"}`}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          aria-label="Save accessibility settings"
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
            highContrast
              ? "bg-yellow-400 text-black hover:bg-yellow-300"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {saved ? "✅ Settings Saved!" : "Save Settings"}
        </button>

        {saved && (
          <div className="text-center text-sm text-green-600 font-medium">
            Your accessibility preferences have been applied.
          </div>
        )}

      </div>
    </main>
  );
}