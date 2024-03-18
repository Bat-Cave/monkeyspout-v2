"use client";

import type { BucketConfig } from "~/components/QuestionComponents/Bucket";
import { useEffect, useState } from "react";
import Bucket from "~/components/QuestionComponents/Bucket";
import { defaultBucketConfig } from "~/components/QuestionComponents/Bucket";
import queryString from "query-string";
import { categories } from "~/utils/quesitons";
import { CheckCircle, Copy, FastArrowRight, Restart } from "iconoir-react";
import ColorPicker from "~/components/UI/ColorPicker";
import CopyToClipboard from "react-copy-to-clipboard";
import type { SizeType } from "../page";

const Widget: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [dropCount, setDropCount] = useState(3);
  const [excludedCategories, setExcludedCategories] = useState<string[]>([""]);
  const [size, setSize] = useState<SizeType>("normal");
  const [showCategories, setShowCategories] = useState(true);
  const [showSkip, setShowSkip] = useState(true);
  const [showCopy, setShowCopy] = useState(true);
  const [showPlayPause, setShowPlayPause] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>(
    defaultBucketConfig.backgroundColor
  );
  const [backgroundColorEnd, setBackgroundColorEnd] = useState<
    string | undefined
  >(defaultBucketConfig.backgroundColorEnd);
  const [textColor, setTextColor] = useState<string | undefined>(
    defaultBucketConfig.textColor
  );
  const [borderColor, setBorderColor] = useState<string | undefined>(
    defaultBucketConfig.borderColor
  );
  const [countdownBarColor, setCountdownBarColor] = useState<
    string | undefined
  >(defaultBucketConfig.countdownBarColor);
  const [countdownBarEndColor, setCountdownBarEndColor] = useState<
    string | undefined
  >(defaultBucketConfig.countdownBarEndColor);
  const query: Partial<BucketConfig> = {};

  if (dropCount !== defaultBucketConfig.dropCount) {
    query.dropCount = dropCount;
  }
  if (size !== defaultBucketConfig.size) {
    query.size = size;
  }
  if (showCategories !== defaultBucketConfig.showCategories) {
    query.showCategories = showCategories;
  }
  if (showSkip !== defaultBucketConfig.showSkip) {
    query.showSkip = showSkip;
  }
  if (showCopy !== defaultBucketConfig.showCopy) {
    query.showCopy = showCopy;
  }
  if (showPlayPause !== defaultBucketConfig.showPlayPause) {
    query.showPlayPause = showPlayPause;
  }
  if (textColor !== defaultBucketConfig.textColor) {
    query.textColor = textColor;
  }
  if (backgroundColor !== defaultBucketConfig.backgroundColor) {
    query.backgroundColor = backgroundColor;
  }
  if (backgroundColorEnd !== defaultBucketConfig.backgroundColorEnd) {
    query.backgroundColorEnd = backgroundColorEnd;
  }
  if (borderColor !== defaultBucketConfig.borderColor) {
    query.borderColor = borderColor;
  }
  if (countdownBarColor !== defaultBucketConfig.countdownBarColor) {
    query.countdownBarColor = countdownBarColor;
  }
  if (countdownBarEndColor !== defaultBucketConfig.countdownBarEndColor) {
    query.countdownBarEndColor = countdownBarEndColor;
  }
  if (
    excludedCategories.length !==
    defaultBucketConfig?.excludedCategories?.length
  ) {
    query.excludedCategories = excludedCategories.filter((cat) => cat !== "");
  }

  const combinedQuery = queryString.stringify(query, {
    arrayFormat: "comma",
  });

  const url = `${baseUrl}/widget${
    combinedQuery.length ? `?${combinedQuery}` : ""
  }`;

  const handleCopy = () => {
    if (!copied) {
      setCopied(true);
    }
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  return (
    <>
      <div className="mx-6 flex w-full flex-col items-center gap-2">
        Your widget url:
        <CopyToClipboard text={url} onCopy={() => handleCopy()}>
          <div className="flex w-full justify-center gap-2 text-sm">
            <input
              type="text"
              placeholder="Search…"
              className="w-full max-w-[500px] overflow-hidden bg-base-100 px-4"
              value={url}
              disabled
            />
            <button className="btn-square btn mr-1 px-1 opacity-60 transition-all hover:btn-secondary hover:opacity-100">
              {copied ? <CheckCircle /> : <Copy />}
            </button>
          </div>
        </CopyToClipboard>
      </div>
      <div className="thin-scrollbar flex h-full w-full flex-col-reverse items-start justify-center gap-5 pt-6 pb-4 md:flex-row">
        <div className="max-h-[unset] w-full max-w-none overflow-y-auto border-base-content pb-40 pr-2 md:max-h-[calc(100vh-300px)] md:max-w-md md:border-r">
          <h1 className="sticky top-0 z-40 w-full bg-base-300 text-left font-extrabold md:shadow-md">
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text py-3 text-2xl text-transparent md:text-5xl">
              Widget Maker
            </span>
          </h1>
          <p>Cusomize the questions to your liking and share it with others!</p>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Drop count: {dropCount}</span>
            </label>
            <input
              type="range"
              min="1"
              max="15"
              value={dropCount}
              onChange={({ target }) => setDropCount(Number(target.value))}
              className="range range-primary"
            />
          </div>
          <div className="divider"></div>
          <div className="form-control w-full">
            <label className="label pt-0">
              <span className="label-text">Size</span>
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                className={`btn text-xs normal-case ${
                  size === "small" ? "btn-primary" : ""
                }`}
                onClick={() => setSize("small")}
              >
                Small
              </button>
              <button
                className={`btn text-base normal-case ${
                  size === "normal" ? "btn-primary" : ""
                }`}
                onClick={() => setSize("normal")}
              >
                Normal
              </button>
              <button
                className={`btn text-lg normal-case ${
                  size === "large" ? "btn-primary" : ""
                }`}
                onClick={() => setSize("large")}
              >
                Large
              </button>
              <button
                className={`btn text-3xl normal-case ${
                  size === "extra large" ? "btn-primary" : ""
                }`}
                onClick={() => setSize("extra large")}
              >
                XL
              </button>
            </div>
          </div>
          <div className="divider"></div>
          <div>
            <p className="label-text pb-2">Included Categories</p>
            <div className="flex w-full flex-wrap gap-2">
              {categories?.map((category) => {
                const { label, color } = category;
                return (
                  <button
                    key={color}
                    name={label}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const { target } = e;
                      const { name }: { name: string } =
                        target as HTMLButtonElement;
                      setExcludedCategories((curr) =>
                        curr.includes(name)
                          ? curr.filter((cat) => cat !== name)
                          : [...curr, name]
                      );
                    }}
                    className={`flex items-center gap-2 rounded-full bg-neutral px-2 py-1 transition-opacity ${
                      excludedCategories.includes(label) ? "opacity-30" : ""
                    }`}
                  >
                    <span
                      className="pointer-events-none h-3 w-3 rounded-full"
                      style={{ background: color }}
                    ></span>
                    <p className="pointer-events-none text-sm">{label}</p>
                  </button>
                );
              })}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setExcludedCategories([]);
                }}
                className={`flex items-center gap-2 rounded-full bg-neutral px-2 py-1`}
              >
                <p className="pointer-events-none flex gap-2 text-sm">
                  <Restart className="w-4" /> Reset
                </p>
              </button>
            </div>
          </div>
          <div className="divider"></div>
          <p className="label-text pb-2">Colors</p>
          <div className="flex flex-wrap gap-y-3 px-2">
            <div className="flex w-1/2 flex-col justify-start gap-3">
              <span className="label-text">Text Color</span>
              <div className="relative flex items-center">
                <ColorPicker
                  defaultColor={textColor}
                  onColorSelect={setTextColor}
                />
              </div>
            </div>
            <div className="flex w-1/2 flex-col justify-start gap-3">
              <span className="label-text">Background Color</span>
              <div className="relative flex items-center gap-4">
                <ColorPicker
                  defaultColor={backgroundColor}
                  onColorSelect={setBackgroundColor}
                />
                <FastArrowRight />
                <ColorPicker
                  defaultColor={backgroundColorEnd}
                  onColorSelect={setBackgroundColorEnd}
                />
              </div>
            </div>
            <div className="flex w-1/2 flex-col justify-start gap-3">
              <span className="label-text">Border Color</span>
              <div className="relative flex items-center">
                <ColorPicker
                  defaultColor={borderColor}
                  onColorSelect={setBorderColor}
                />
              </div>
            </div>
            <div className="flex w-1/2 flex-col justify-start gap-3">
              <span className="label-text">Countdown Bar Color</span>
              <div className="relative flex items-center gap-4">
                <ColorPicker
                  defaultColor={countdownBarColor}
                  onColorSelect={setCountdownBarColor}
                />
                <FastArrowRight />
                <ColorPicker
                  defaultColor={countdownBarEndColor}
                  onColorSelect={setCountdownBarEndColor}
                />
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="form-control w-full">
            <label className="label flex w-full cursor-pointer justify-between">
              <span className="label-text">Show Categories</span>
              <input
                type="checkbox"
                className="toggle-secondary toggle"
                checked={showCategories}
                onChange={() => setShowCategories(!showCategories)}
              />
            </label>
          </div>
          <div className="form-control w-full">
            <label className="label flex w-full cursor-pointer justify-between">
              <span className="label-text">Show Skip Button</span>
              <input
                type="checkbox"
                className="toggle-secondary toggle"
                checked={showSkip}
                onChange={() => setShowSkip(!showSkip)}
              />
            </label>
          </div>
          <div className="form-control w-full">
            <label className="label flex w-full cursor-pointer justify-between">
              <span className="label-text">Show Copy Button</span>
              <input
                type="checkbox"
                className="toggle-secondary toggle"
                checked={showCopy}
                onChange={() => setShowCopy(!showCopy)}
              />
            </label>
          </div>
          <div className="form-control w-full">
            <label className="label flex w-full cursor-pointer justify-between">
              <span className="label-text">Show Play/Pause Button</span>
              <input
                type="checkbox"
                className="toggle-secondary toggle"
                checked={showPlayPause}
                onChange={() => {
                  setShowPlayPause(!showPlayPause);
                }}
              />
            </label>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-start">
          <p className="mb-3 text-xl font-bold">Preview</p>
          <Bucket
            dropCount={Number(dropCount) || 0}
            size={size}
            excludedCategories={excludedCategories}
            showCategories={showCategories}
            showSkip={showSkip}
            showCopy={showCopy}
            showPlayPause={showPlayPause}
            backgroundColor={backgroundColor}
            backgroundColorEnd={backgroundColorEnd}
            textColor={textColor}
            borderColor={borderColor}
            countdownBarColor={countdownBarColor}
            countdownBarEndColor={countdownBarEndColor}
          />
        </div>
      </div>
    </>
  );
};

export default Widget;
