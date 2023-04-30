import type { Question } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { categories, specials, types } from "~/utils/quesitons";
import { toast } from "react-hot-toast";

const EditQuestion: React.FC<{ q: Question | null; onClose: () => void }> = ({
  q,
  onClose,
}) => {
  const [{ question, category, type, special, timeout }, setValues] = useState({
    question: q?.question || "",
    category: q?.category || "",
    type: q?.type || "",
    special: q?.special || "",
    timeout: Number(q?.timeout) / 1000,
  });

  useEffect(() => {
    setValues({
      question: q?.question || "",
      category: q?.category || "",
      type: q?.type || "",
      special: q?.special || "",
      timeout: Number(q?.timeout) / 1000,
    });
  }, [q]);

  const ctx = api.useContext();

  const { mutate, isLoading } = api.questions.updateById.useMutation({
    onSuccess: () => {
      toast.success("Successfully updated question");
      onClose();
      void ctx.questions.getAll.invalidate();
    },
    onError: (e) => {
      toast.error("There was an error updating that question");
      console.warn(e);
    },
  });

  const handleInput = (e: { target: { value: string; name: string } }) => {
    const { value, name } = e.target;
    setValues((curr) => ({ ...curr, [name]: value }));
  };

  const handleSubmit = () => {
    void mutate({
      id: q?.id || "",
      question,
      category,
      type,
      special,
      timeout: `${Number(timeout) * 1000}`,
    });
  };
  return (
    <div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Question</span>
        </label>
        <textarea
          name="question"
          className="textarea-bordered textarea-primary textarea h-24"
          placeholder="Type Here"
          value={question}
          onChange={handleInput}
          disabled={isLoading}
        ></textarea>
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Category</span>
        </label>
        <select
          name="category"
          className="select-bordered select-primary select"
          value={category}
          onChange={handleInput}
          disabled={isLoading}
        >
          {categories.map(({ label }) => (
            <option key={label}>{label}</option>
          ))}
        </select>
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Type</span>
        </label>
        <select
          name="type"
          className="select-bordered select-primary select"
          value={type}
          onChange={handleInput}
          disabled={isLoading}
        >
          <option value=""></option>
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Special</span>
        </label>
        <select
          name="special"
          className="select-bordered select-primary select"
          value={special}
          onChange={handleInput}
          disabled={isLoading}
        >
          <option value=""></option>
          {specials.map((sp) => (
            <option key={sp}>{sp}</option>
          ))}
        </select>
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Timeout (in seconds)</span>
        </label>
        <input
          name="timeout"
          type="number"
          step="1"
          min="1"
          className="input-bordered input-primary input w-full"
          value={timeout}
          onChange={handleInput}
          disabled={isLoading}
        />
      </div>
      <br />
      <button className="btn-primary btn" onClick={() => handleSubmit()}>
        Edit Question
      </button>
    </div>
  );
};

export default EditQuestion;
